"use strict";

const config = require("../config");
const express = require("express");
const service = express();
const request = require("superagent");
const moment = require("moment");

service.get("/service/:location", (req, res, next) => {
  request.get(
    `https://eu1.locationiq.com/v1/search.php?key=${config.locationiqApiKey}&q=${encodeURI(req.params.location)}&format=json`,
    (err, response) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      const location = {
        lat: response.body[0].lat,
        lng: response.body[0].lon
      };

      request.get(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${config.timezonedbApiKey}&format=json&by=position&lat=${location.lat}&lng=${location.lng}`,
        (err, response) => {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          }

          const result = response.body.timestamp;
          const timeString = moment.unix(result).utc().format("dddd, DD MMMM YYYY, HH:mm:ss");

          res.json({ result: timeString });
        }
      );
    }); 
});

module.exports = service;