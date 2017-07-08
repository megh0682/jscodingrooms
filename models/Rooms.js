import Users from './Users';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var RoomsSchema = new Schema({
  title: {type: String,default:'JScoderoom-1001'},
  description: {type: String,default:'This is JS code room'},
  logo: {type:String,default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHmFHSLQTVcR6oiJJCtT_m22AwMXIP00seCkIsXfhXgaa0f0He8A'},
  creator: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
 });

RoomsSchema.virtual('roomID').get(function() {
    return this._id;
});

var Rooms = mongoose.model("Rooms", RoomsSchema);
module.exports = Rooms;