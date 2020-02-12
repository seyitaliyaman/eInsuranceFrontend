const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var path = require('path');

const router = express.Router();

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

var id;

router.get('/',(req,res)=>{
    res.render('enter-detail');
})

router.get('/detail/:id',(req,res)=>{
    id= req.params.id;
    console.log(req.params.id);
    console.log(id);
    res.redirect('/enter-detail');
})

router.post('/updateCase',(req,res)=>{

    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/helper/update/case/'+id,
        method: 'POST',
        headers:{
            'content-type' : 'application/json',
            'fileNo' : req.body.fileNo,
            'accept':'application/json'
        }
    };

    var postData = JSON.stringify({
        "expertName": req.body.expertName,
        "expertSurname": req.body.expertEmail,
        "expertPhone" : req.body.expertPhone
    });

    const request = http.request(options,(res)=>{
        res.setEncoding('utf8');
            
        
        res.on('end',()=>{
            console.log('No more data in response');
        });
    });

    request.on('error',(e)=>{
        console.log(`problem with request: ${e.message}`);
    })

    request.write(postData);
    request.end();

    res.redirect('/index');
})

module.exports = router;
