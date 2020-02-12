const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const dateFormat = require('dateformat');
const router = express.Router();

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res)=>{

    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/helper/getCases/1',
        method: 'GET',
        headers:{
            'content-type' : 'application/json',
            'accept':'application/json'
        }
    };
    var casesInfos =[];
    const request = http.request(options,(res1)=>{
        res1.setEncoding('utf8');
        res1.on('data',(chunk)=>{
            var gelendata= JSON.parse(`${chunk}`);
            
            for(data of gelendata){
                casesInfos.push({
                    id : data.id,
                    vehiclePlate : data.incidentInfo.firstVehicle.vehiclePlate,
                    ownerName : data.incidentInfo.firstVehicle.vehicleOwner.ownerName,
                    createDate : dateFormat(data.createDate,"dd/MM/yyyy")
                })
                console.log(data.incidentInfo.firstVehicle.vehiclePlate);
            }
    
            console.log("casesInfos ----")
            console.log(casesInfos);
        });
        res1.on('end',()=>{
            console.log('No more data in response');
            res.render('wait-detail',{list : casesInfos});
        });
    });

    request.end();
    
    //res.render('wait-detail',{list : casesInfos});
})

router.get('/deletecase/:id',(req,res)=>{
    id= req.params.id;
    console.log(req.params.id);

    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/helper/delete/case/'+id,
        method: 'POST',
        headers:{
            'content-type' : 'application/json',
            'accept':'application/json'
        }
    };

    const request = http.request(options,(res1)=>{
        res1.setEncoding('utf8');

        res1.on('end',()=>{
            console.log('No more data in response');
            res.redirect('/');
        })
    });

    request.end();



})

module.exports = router;
