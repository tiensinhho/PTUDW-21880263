'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
//cau hinh public static folder
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
    res.send('Hello to Eshop')
})

//khoi dong web server
app.listen(port, ()=>{
    console.log(`sever is running on port ${port}`);
})