const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const router = express.Router();

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res)=>{
    res.render('login');
})

router.post('/handle_login',(req,res)=>{
    console.log(req.body.username +" "+ req.body.pw);
    var postData = JSON.stringify({username:req.body.username, password:req.body.pw});

    const options={
        hostname: 'localhost',
        port:'8080',
        path:'/login/auth',
        method: 'POST',
        headers:{
            'content-type' : 'application/json',
            'accept':'application/json'
        }
    };

    var flag =false;
    const request = http.request(options,(res)=>{
        res.setEncoding('utf8');
        res.on('data',(chunk)=>{    
            var gelendata = JSON.parse(`${chunk}`);
            console.log(gelendata);
            if('id' in gelendata){
                console.log('id varr');
                flag = true;
                makeRoute(flag);
                console.log(flag +" flag");
            }
            console.log(gelendata.id);
            
            //console.log(`BODY : ${chunk}`);
            
        }); 
        res.on('end',()=>{
            console.log('No more data in response');
        });
    });

    request.on('error',(e)=>{
        console.log(`problem with request: ${e.message}`);
    })

    request.write(postData);
    request.end();


    function makeRoute(flag){
        if(flag){
            if(flag){
                res.redirect('index');
            }else{
                res.redirect('/');
            }
        }
    }
    


    //res.redirect('index');
})

/*app.post('/login',(req,res)=>{
    console.log(req.body.email + " " + req.body.pw);
})*/






module.exports = router;