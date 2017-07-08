import express from 'express';
import mongodb from 'mongodb';
import open from 'open';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/codingchatrooms';
app.set('port', process.env.PORT || 7000);


mongodb.MongoClient.connect(dbUrl,function(err,db){

//context root
  app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname, '../public', 'index.html'));

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
  
  const server =  app.listen(app.get('port'),function(err){
     if(err){
       console.log(err);
     }else{
      //open(`http://localhost:${app.get('port')}`);
      console.log(`server is running on localhost:${app.get('port')}`);
     }
  });
  

  // socket.io connection

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

  });
