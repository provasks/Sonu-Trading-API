var mongoose = require('mongoose');
class Common {
    checkId(response, id){
        if (!mongoose.Types.ObjectId.isValid(id)){
            response.status(404).json({
                message: 'Carousel with id ' + id + ' was not found.'
            });
        }
    }
    update(obj, request, response, error){
        for (var property in request.body) {
            if (request.body.hasOwnProperty(property)) {
                if (typeof obj[property] !== 'undefined') {
                    obj[property] = request.body[property];
                }
            }
        }
        obj.save();
    }
    checkError(response, error){
        if (error) {
            response.status(500).send(error);
            return;
        }

    }
}
module.exports = Common;