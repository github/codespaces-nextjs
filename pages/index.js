/*
Create a HomePage Component with the following specifications:
1. A H1 with the text "Find Nutrition Facts for any recipe"
2. Create a text area and a button. When the button is clicked, the text in the text area should be sent to the server as a POST request.
3. The server should respond with the nutrition facts for the recipe below the text area.
*/

import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

const HomePage = () => {
  const [recipe, setRecipe] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/openai/generateinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe }),
      });
      const nutrition = await response.json();
      console.log(nutrition.data);
      setNutrition(nutrition.data);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <Container maxWidth="md">
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
                placeholder="Enter recipe"
                style={{ width: "98%", minHeight: "200px", padding: "10px" }}
              />
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
            </Grid>
          </Grid>
        </form>
      </Paper>
      <div style={{ paddingTop: "20px" }}>
        {
          error ? (
            <Typography color="error">
              An error occurred: {error.errorMessage}
            </Typography>
          ) : (
            nutrition ? (
              <>
              <Typography>{nutrition}</Typography>
              </>
            ) : "nothing to see here"
          )
        }
      </div>
    </Container>
  );
};

export default HomePage;
