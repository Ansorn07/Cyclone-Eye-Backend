const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data');

router.get('/cyclones/active', (req, res) => {
  const activeCyclones = JSON.parse(fs.readFileSync(path.join(dataPath, 'active-cyclones.json')));
  res.json(activeCyclones);
});

router.get('/cyclones/history', (req, res) => {
  const historyData = JSON.parse(fs.readFileSync(path.join(dataPath, 'history.json')));
  res.json(historyData);
});

router.get('/alerts', (req, res) => {
  const alertsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'alerts.json')));
  res.json(alertsData);
});

router.get('/forecasts/:cycloneId', (req, res) => {
  const { cycloneId } = req.params;
  const forecastData = JSON.parse(fs.readFileSync(path.join(dataPath, 'forecasts.json')));
  const cycloneForecast = forecastData[cycloneId];

  if (cycloneForecast) {
    res.json(cycloneForecast);
  } else {
    res.status(404).json({ message: 'Forecast not found for the given cyclone ID.' });
  }
});

router.get('/resources', (req, res) => {
  const resourcesData = JSON.parse(fs.readFileSync(path.join(dataPath, 'resources.json')));
  res.json(resourcesData);
});

module.exports = router;