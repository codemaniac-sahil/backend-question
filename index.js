const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
const API_KEY = "db8788ed4e52495bf8a51ae0a8e4caff";

app.post("/getWeather", async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = {};

    for (const city of cities) {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const temperature = response.data.main.temp;
      weatherData[city] = `${temperature}°C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
