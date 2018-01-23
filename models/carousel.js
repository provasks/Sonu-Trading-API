var mongoose = require('mongoose');
var carouselSchema = new mongoose.Schema({
  url: {
    Desktop: {
      type: String,
      required: true
    },
    Tablet: {
      type: String,
      required: true
    },
    Mobile: {
      type: String,
      required: true
    }
  },
  alt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  }
}, { collection: 'carousel' });

module.exports = mongoose.model('Carousel', carouselSchema);
