import Rooms from './Rooms';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UsersSchema = new Schema({
  name: {type: String,
    required: true,
    trim: true},
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true},
  password: {type: String,
    required: true},
  roomsCreated: [{ type: Schema.Types.ObjectId, ref: 'Rooms' }]
 });

UsersSchema.virtual('userID').get(function() {
    return this._id;
});

var Users = mongoose.model("Users", UsersSchema);
module.exports = Users;

/**
 * var item = new Item({name: 'Foo'});
item.save(function(err) {

  store.itemsInStore.push(item);
  store.save(function(err) {
    // todo
  });
});
Get items from a store

Store
  .find({}) // all
  .populate('itemsInStore')
  .exec(function (err, stores) {
    if (err) return handleError(err);

    // Stores with items
});
 */