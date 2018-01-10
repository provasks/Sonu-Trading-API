//ref: https://github.com/fedosejev/restful-api-express-mongoose
var express = require('express');
var Carousel = require('../models/carousel');

var carouselRouter = express.Router();

carouselRouter
  .route('/carousel')
  .get(function (request, response) {
    console.log('GET /carousel');
    Carousel.find(function (error, carousel) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      console.log(carousel);
      response.json(carousel);
    })
  })
  .post(function (request, response) {
    console.log('POST /carousel');
    var carousel = new Carousel(request.body);
    carousel.save();
    response.status(201).send(carousel);
  })
  .put(function (request, response) {
    console.log('PUT /carousel/:itemId');
    var itemId = request.params.itemId;
    Carousel.findOne({ id: itemId }, function (error, carousel) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      if (carousel) {
        carousel.name = request.body.name;
        carousel.description = request.body.description;
        carousel.quantity = request.body.quantity;
        carousel.save();
        response.json(carousel);
        return;
      }
      response.status(404).json({
        message: 'Carousel with id ' + itemId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {
    console.log('DELETE /carousel/:itemId');
    var itemId = request.params.itemId;
    Carousel.findOne({ id: itemId }, function (error, carousel) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      if (carousel) {
        carousel.remove(function (error) {
          if (error) {
            response.status(500).send(error);
            return;
          }
          response.status(200).json({
            'message': 'Carousel with id ' + itemId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Carousel with id ' + itemId + ' was not found.'
        });
      }
    });
  });

module.exports = carouselRouter;