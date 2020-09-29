const express = require('express');
const app = express();
const itemRoutes = express.Router();

let Item = require('../model/Item');

// api to add item
itemRoutes.route('/add').post(function (req, res) {
  let item = new Item(req.body);
  item.save()
  .then(item => {
    res.status(200).json({'status': 'success','mssg': 'item added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get items
itemRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','items': items});
    }
  });
});

// api to edit item
itemRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Item.findById(id, function (err, item){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','item': item});
    }
  });
});

// api to update route
itemRoutes.route('/update/:id').post(function (req, res) {
    Item.findById(req.params.id, function(err, item) {
    if (!item){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        item.name = req.body.name;
        item.description = req.body.description;
        item.count_number = req.body.count_number;

        item.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = itemRoutes;