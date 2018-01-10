var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

/**
 {
  "urlDesktop":"img-01.jpg",
  "urlTablet": "img-01.jpg",
  "urlMobile": "img-01.jpg",
  "alt":"Apple",
  "title": "Sweet Apple",
  "subTitle": "Sweet Subtitle"
 }
 */
var carouselSchema = new mongoose.Schema({
  urlDesktop: {
    type: String,
    required: true
  },
  urlTablet: {
    type: String,
    required: true
  },
  urlMobile: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tubTitle: {
    type: String,
    required: true
  }
}, { collection: 'carousel' });

module.exports = mongoose.model('Carousel', carouselSchema);
