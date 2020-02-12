const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const http = require('http');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res)=>{
    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/workorder/getInfo/34zn4341',
        method: 'GET',
        headers:{
            'content-type' : 'application/json',
            'accept':'application/json' 
        }
    };
    var info =[];
    const request = http.request(options,(res1)=>{
        res1.setEncoding('utf8');
        res1.on('data',(chunk)=>{
            var gelendata= JSON.parse(`${chunk}`);
            
            console.log(gelendata);
            for(data of gelendata){
                info.push({
                    id : data.id,
                    vehiclePart : data.vehiclePartDto.vehiclePartName,
                    done : data.done
                })
                
            }
    
        });
        res1.on('end',()=>{
            console.log(info)
            console.log('No more data in response');
            res.render('car-status',{list : info});
        });
    });

    request.end();
})

module.exports = router;
