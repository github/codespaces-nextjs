/*
Create a HomePage Component with the following specifications:
1. A H1 with the text "Find Nutrition Facts for any recipe"
2. Create a text area and a button. When the button is clicked, the text in the text area should be sent to the server as a POST request.
3. The server should respond with the nutrition facts for the recipe below the text area.
*/

/* 
q: I want to add a header with the name on the left and the logo on the right. How do I do that?
a: You can use the AppBar component from Material UI. 
The AppBar component has a position prop that you can set to "static" to make it fixed at the top of the page. 
You can use the Toolbar component to add content to the AppBar. 
You can use the Typography component to add text to the Toolbar. 
You can use the IconButton component to add an icon to the Toolbar. 
You can use the img tag to add an image to the IconButton component. 
You can use the style prop to set the height of the image.

*/

import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import Header from "../components/Header";

function HomePage() {
  const [recipe, setRecipe] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/openai/generateinfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipe }),
        }
      );

      // get nutrition info
      const nutrition = await response.json();

      // display nutrition info
      if (nutrition.data) {
        console.log(nutrition.data);
        setNutrition(nutrition.data);
        setLoading(false);
      } else {
        setError("Unable to get nutrition info");
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  function handleClear(event) {
    event.preventDefault();
    setRecipe("");
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" style={{ marginTop: "40px" }}>
        <Typography variant="h2" gutterBottom>
          Find Nutrition Facts for any recipe{" "}
        </Typography>
        <Paper elevation={24} style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextareaAutosize
                  value={recipe}
                  onChange={(e) => setRecipe(e.target.value)}
                  placeholder="Enter recipe to get nutrition facts"
                  style={{ width: "98%", maxWidth: "850px", minHeight: "200px", padding: "10px" }} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                >
                  Submit
                </Button>
                <br />
                <Button
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <div style={{ paddingTop: "40px" }}>
          {loading && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {error ? (
            <Typography color="error">
              An error occurred: {error.errorMessage}
            </Typography>
          ) : nutrition ? (
            <>
              <Typography>{nutrition}</Typography>
            </>
          ) : null}
        </div>
      </Container>
    </>
  );
}

export default HomePage;
