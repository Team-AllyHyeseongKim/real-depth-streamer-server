const bodyParser = require('body-parser')
const multer = require('multer');
const express = require("express");
const fs = require('fs');

const app = express();


app.use(bodyParser.json({limit: '50mb',
	verify: (req, res, buf) => {
    		req.rawBody = buf
  	}
}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get("/", (req, res) => {
  res.send([1, 2, 3]);
});

app.post("/", (req, res) => {
res.end();
time = req.body.timestamp
  console.log("client time : " + req.body.timestamp)
/*
  fs.writeFile('./upload/base64/color/'+ time + '.txt', req.body.color, function(err) {
    	if (err) throw err;
	});
  fs.writeFile('./upload/base64/depth/'+ time +'.txt', req.body.depth, function(err) {
        if (err) throw err;
        });

*/
  var color_data = req.body.color.replace(/^data:image\/\w+;base64,/, "");
  var color_buf = Buffer.from(color_data, 'base64');


  fs.writeFile('./upload/color/'+ time + '.jpg', color_buf, function(err) {
    	if (err) throw err;
	});
  
  var depth_data = req.body.depth.replace(/^data:image\/\w+;base64,/, "");
  var depth_buf = Buffer.from(depth_data, 'base64');
  fs.writeFile('./upload/depth/'+ time +'.png', depth_buf, function(err) {
        if (err) throw err;
        });
 


});


app.listen(3000, () => console.log("Listening on port 3000..."));


