const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/helper',(req,res)=>{
    res.render('helper');
})



module.exports = router;
