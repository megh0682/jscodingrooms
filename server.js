// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
import users from './backend/routes/users';
import auth from './backend/routes/auth';
import path from 'path';


// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 9000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use('/api/users', users);
app.use('/api/auth', auth);

if (true) {
  app.use(express.static(path.join(__dirname,'build')));
 
}else{
  app.use(express.static("./public"));
}

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
//mongoose.connect("mongodb://newyorktimesdb:newyorktimesdb@ds161931.mlab.com:61931/newyorktimesdb");
mongoose.connect("mongodb://groupcoding:groupcoding@ds151222.mlab.com:51222/groupcoding");
                  
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
//context root
  app.get('/',(req,res)=>{
    
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);

  });


// rooms collection
  app.get('/api/rooms',(req,res)=>{
    
    db.collection('rooms').find({}).toArray((err,rooms) => {

        res.json({rooms});
    });


  });

// get a room by id

 app.get('/api/rooms/:id',(req,res,next)=>{
    
      var room = {"id":10,"title":"JS callbacks","logo":"https://www.google.com/imgres?imgurl=http%3A%2F%2Frs951.pbsrc.com%2Falbums%2Fad352%2FLittomoon%2FPixel%2520Dolls%2FMini%2520Room%2Fhospital.gif~c200&imgrefurl=http%3A%2F%2Fphotobucket.com%2Fgifs%2Fmini%2520room&docid=Ksq5meIBZbgV6M&tbnid=B-mhSVhitChL6M%3A&vet=10ahUKEwiA-OfaxuvUAhWEVyYKHakDA6AQMwgjKAAwAA..i&w=200&h=200&bih=662&biw=1366&q=mini%20images%20animated%20rooms&ved=0ahUKEwiA-OfaxuvUAhWEVyYKHakDA6AQMwgjKAAwAA&iact=mrc&uact=8"};
      res.json(room);
  

  });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {

  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);

});

// // This is the route we will send delete requests to delete the article by id
// app.delete("/api/:id", function(req, res) {
//   console.log("id: " + req.params.id);
//     History.findByIdAndRemove(req.params.id, function (err,doc) {  
//     // We'll create a simple object to send back with a message and the id of the document that was removed
//     var response = {
//         message: "Article successfully deleted",
//         id: doc._id
//     };
//     res.send(response);
//     });
// });


/************************Server Listener*******************/

  const server =  app.listen(PORT,function(err){
     if(err){
       console.log(err);
     }else{
       console.log("App listening on PORT " + PORT);
     }
  });

    
/***********************socket.io operations***********/

  const io = require('socket.io')(server);


    io.on('connection', (socket) => {

      console.log('a user connected');
    
      socket.on('disconnect', () => {
        console.log('user disconnected');
        
       });

      socket.on('room', function(data) {
        console.log(`joining room in ${data.room} `);
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('load users and code')
        socket.broadcast.to(data.room).emit('new user join', data.user)
      });

      socket.on('leave room', function(data) {
        console.log(`user left room ${data.room} `);
        socket.broadcast.to(data.room).emit('user left room', data.user)
        socket.leave(data.room)
      })

      socket.on('coding event', function(data) {
        console.log('in EXPRESS coding event')
        console.log(data)
        socket.broadcast.to(data.room).emit('receive code', {code: data.code, currentlyTyping: data.currentlyTyping});
      })
      socket.on('change mode', function(data) {
        socket.broadcast.to(data.room).emit('receive change mode', data.mode)
      })

      socket.on('send users and code', function(data) {
        socket.broadcast.to(data.room).emit('receive users and code', data)
      })

    });

  






