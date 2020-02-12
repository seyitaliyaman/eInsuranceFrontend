const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const http = require('http');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res)=>{
    res.render('helper');
})

router.post('/addHelper',(req,res)=>{
    
    var postData = JSON.stringify({
        "createDate": req.body.currentDate,
        "policyDto":{
            "policyNo":req.body.policyNumber,
            "policyStartDate":req.body.policyBeginDate,
            "policyEndDate":req.body.policyEndDate,
            "agencyDto":{
                "agencyNo":req.body.agencyNumber,
                "insuranceCompanyDto":{
                    "companyName": req.body.company
                }
            }
        },
        "incidentInfoDto":{
            "incidentLocation": req.body.incidentAddress,
            "incidentDate":req.body.incidentDate,
            "incidentEstDamage" : req.body.estDamage,
		    "incidentCaseType" : "hull",
		    "firstVehicle" : {
			    "vehiclePlate" : req.body.plate1,
                "vehicleBrand" : req.body.brandName1,
                "vehicleModel" : req.body.modal1,
                "vehicleUsage" : req.body.usage1,
                "vehicleOwnerDto" : {
                    "ownerTC" : req.body.owIdNo1,
                    "ownerVKN" : "",
                    "ownerVD" : "",
                    "ownerName" : req.body.owName1.split(" ")[0],
                    "ownerSurname" : req.body.owName1.split(" ")[1],
                    "ownerPhone" : req.body.owPhone1,
                    "ownerAddress" : ""
                },
                "driverDto" :[
                    {
                        "driverTC" : req.body.drIdNo1,
                        "driverName" : req.body.drNameSurname1.split(" ")[0],
                        "driverSurname" : req.body.drNameSurname1.split(" ")[1],
                        "driverPhone" : req.body.drPhone1
                    }
                ]   
            },
            "secondVehicle" : {
                "vehiclePlate" : req.body.plate2,
                "vehicleBrand" : req.body.brandName2,
                "vehicleModel" : req.body.modal2,
                "vehicleUsage" : req.body.usage2,
                "vehicleOwnerDto" : {
                    "ownerTC" : req.body.owIdNo2,
                    "ownerVKN" : "",
                    "ownerVD" : "",
                    "ownerName" : req.body.owName2.split(" ")[0],
                    "ownerSurname" : req.body.owName2.split(" ")[1],
                    "ownerPhone" : req.body.owPhone2,
                    "ownerAddress" : ""
                },
                "driverDto" :[
                    {
                        "driverTC" : req.body.drIdNo2,
                        "driverName" : req.body.drNameSurname2.split(" ")[0],
                        "driverSurname" : req.body.drNameSurname2.split(" ")[1],
                        "driverPhone" : req.body.drPhone2
                    }
                ]
            }
        },
        "expertDto":{

        }
    });

    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/helper/add/case/1',
        method: 'POST',
        headers:{
            'content-type' : 'application/json',
            'accept':'application/json'
        }
    };

    const request = http.request(options,(res)=>{
        
    });
    request.on('error',(e)=>{
        console.log(`problem with request: ${e.message}`);
    })

    request.write(postData);
    request.end();


    res.redirect('/helper');
    
});



module.exports = router;
