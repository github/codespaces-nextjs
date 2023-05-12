/*
Create a controller with the following specifications:

1. import the Configuration class and the OpenAIApi class from the openai npm module
2. create a new configuration object that includes the api key and uses the Configuration class from the openai module
3. create a new instance of the OpenAIApi class and pass in the configuration object
4. create an async function called generateInfo that accepts a request and response object as parameters
5. use try to make a request to the openai api and return the response
6. use catch to catch any errors and return the error
7. export the generateInfo function as a module
*/

const { Configuration, OpenAIApi } = require('openai');
// import json data from prompt.json file
const { recipePrompt }  = require('./prompt.json');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateInfo = async (req, res) => {
    const { recipe } = req.body;

    try {
       const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${recipePrompt}${recipe}`,
        max_tokens: 200,
        temperature: 0.5,
        n: 1,
       });

       // get response from openai
         const response = completion.data.choices[0].text;
         res.setHeader("Access-Control-Allow-Origin", "*")
       
        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
          
        res.status(500).json({
            success: false,
            errorMessage: "There was an error getting the nutritional information. Try again",
            error: error
        })
    }
};

module.exports = { generateInfo };