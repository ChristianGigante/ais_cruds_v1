//findByIdAndUpdate 
const models = require('../../model/item');
var response = { error: false, success: false, data: null };

let updateOne = (req, res) => {
    models.Item.findById(
        { _id: req.params.id }, //find match item in DB
        // req.body,//the update to be made
        (err, data) => { //callback function            
            if (err) { // Handle any possible database errors
                response.status = 404
                response.error = true
                response.message = err.msg
                return res.status(200).send(response);
            } else {
                data.name = req.body.name
                data.quantity = req.body.quantity
                data.priority = req.body.priority
                data.save()
                    .then((data) => {
                        response.success = true
                        response.status = 200
                        response.data = data
                        response.message = "Updated Successfully!"
                        // console.log(response);
                        return res.status(200).send(response);
                    })

            }
        })
        .catch(err => {
            response.error = err
            response.status = 503
            response.message = "Service Unavailable"
            return res.status(200).send(response);
        })
    // res.send(response);
}
module.exports = { updateOne }