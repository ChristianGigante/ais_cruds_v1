const model = require('../../model/item');
var response = { error: false, success: false, message: null, data: null }
let createItem = (req, res) => {

    // Validate request
    if (!req.body) {
        response.error = true
        response.message = "Item filleds can not be empty"
        return res.status(200).send(response);
    }
    
    let name = req.body.name;
    let quantity = req.body.quantity;
    let priority = req.body.priority;

    let Item = new model.Item({
        name,
        quantity,
        priority
    })

    Item.save()
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.send(err);
        })
        
}

module.exports = { createItem }