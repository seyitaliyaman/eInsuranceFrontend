const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const router = express.Router();

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

var gelendata;

router.get('/',(req,res)=>{
    res.render('work-order',{data:gelendata});
})

router.get('/open/:id',(req,res)=>{
    id= req.params.id;
    
    console.log(req.params.id);
    console.log(id);

    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/helper/getCase/'+id,
        method: 'GET',
        headers:{
        }
    };


    const request = http.request(options,(res1)=>{
        res1.setEncoding('utf8');
        res1.on('data',(chunk)=>{    
            gelendata = JSON.parse(`${chunk}`);
            console.log(gelendata.incidentInfo.secondVehicle);
        }); 
        res1.on('end',()=>{
            console.log('No more data in response');
            getMapping(gelendata);
        });
    });

    function getMapping(a){
        if(gelendata != null){
            res.redirect('/work-order');
        }
    }

    request.end();

})

router.post('/insert',(req,res)=>{
    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/workorder/addWorkOrder/'+id,
        method: 'POST',
        headers:{
            'content-type' : 'application/json',
        }
    };

    var postData = JSON.stringify({
        "vehicleInfoDto" : {
            "vehiclePlate" : gelendata.incidentInfo.firstVehicle.vehiclePlate,
            "vehicleBrand" : gelendata.incidentInfo.firstVehicle.vehicleBrand,
            "vehicleModel" : gelendata.incidentInfo.firstVehicle.vehicleModel,
            "vehicleUsage" : gelendata.incidentInfo.firstVehicle.vehicleUsage,
            "vehicleOwnerDto" : gelendata.incidentInfo.firstVehicle.vehicleOwner,
            "driverDto" : gelendata.incidentInfo.firstVehicle.driver
        },
        "vehicleKm": req.body.km,
        "vehicleChassis" : req.body.chasisNo,
        "motorNumber" : req.body.engineNo, 
    });

    const request = http.request(options,(res1)=>{
        console.log(gelendata.incidentInfo.firstVehicle)
        res1.setEncoding('utf8');
        res1.on('data',(chunk)=>{  
            console.log(chunk);
        }); 
        res1.on('end',()=>{
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
