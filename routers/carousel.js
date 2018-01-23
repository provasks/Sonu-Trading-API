var express = require('express');
var Carousel = require('../models/carousel');
var mongoose = require('mongoose');
var Common = require('../classes/common');

var carouselRouter = express.Router();
let common = new Common();

carouselRouter
    .route('/carousels')
    .post(function (request, response) {
        console.log('POST /carousels');
        var carousel = new Carousel(request.body);
        carousel.save();
        response.status(201).send(carousel);
    })
    .get(function (request, response) {
        console.log('GET /carousels');
        Carousel.find(function (error, carousels) {
            common.checkError(response, error);
            response.json(carousels);
        });
    });

carouselRouter
    .route('/carousels/:carouselId')
    .get(function (request, response) {
        console.log('GET /carousels/:carouselId');
        var carouselId = request.params.carouselId;
        common.checkId(response, carouselId);
        Carousel.findOne({ _id: carouselId }, function (error, carousel) {
            common.checkError(response, error);
            response.json(carousel);
        });
    })
    .put(function (request, response) {
        console.log('PUT /carousels/:carouselId');
        let carouselId = request.params.carouselId;
        common.checkId(response, carouselId);
        Carousel.findOne({ _id: carouselId }, function (error, carousel) {
            common.checkError(response, error);

            if (carousel) {
                common.update(carousel, request);
                response.json(carousel);
                return;
            }

            response.status(404).json({
                message: 'Carousel with id ' + carouselId + ' was not found.'
            });
        });
    })
    .patch(function (request, response) {
        console.log('PATCH /carousels/:carouselId');
        let carouselId = request.params.carouselId;
        common.checkId(response, carouselId);
        Carousel.findOne({ _id: carouselId }, function (error, carousel) {
            common.checkError(response, error);
            if (carousel) {
                common.update(carousel, request);
                response.json(carousel);
                return;
            }

            response.status(404).json({
                message: 'Carousel with id ' + carouselId + ' was not found.'
            });
        });
    })
    .delete(function (request, response) {
        console.log('DELETE /carousels/:carouselId');
        var carouselId = request.params.carouselId;
        common.checkId(response, carouselId);

        Carousel.findOne({ _id: carouselId }, function (error, carousel) {
            common.checkError(response, error);

            if (carousel) {
                carousel.remove(function (error) {
                    common.checkError(response, error);

                    response.status(200).json({
                        _id: carouselId,
                        'message': 'Carousel with id ' + carouselId + ' was removed.'
                    });
                });
            } else {
                response.status(404).json({
                    message: 'Carousel with id ' + carouselId + ' was not found.'
                });
            }
        });
    });

module.exports = carouselRouter;