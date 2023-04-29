const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const app = express()
const encoder = bodyparser.urlencoded( )
app.use(bodyparser.json());
const con = mysql.createConnection({host:"localhost",user:"root",password:"",database:"clg"})
con.connect(function(error){
    if(error) 
    throw error;
    else console.log("Connected to database")
});
app.get("/",function(req,res){
        res.sendFile(__dirname + "/home.html");
})
app.get('/insert',(req,res)=>{
    res.sendFile(__dirname+"/insert.html")
})
app.get('/display',(req,res)=>{
    res.sendFile(__dirname+"/display.html")
})
app.get('/ddept',(req,res)=>{
    res.sendFile(__dirname+"/dispdept.html")
})
app.get('/ddesig',(req,res)=>{
    res.sendFile(__dirname+"/dispdesig.html")
})
app.post('/ins',encoder,(req,res)=>{
    let a=req.body.t1;
    let b=req.body.t2;
    let c=req.body.t3;
    let d=req.body.t4;
    let e=req.body.t5;
    var sql="insert into facd (name,dept,mobile,salary,desig) values("+con.escape(a)+","+con.escape(b)+","+con.escape(c)+","+con.escape(d)+","+con.escape(e)+")"
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.affectedRows>0)
        {
            res.redirect("/display");
            console.log("1 record  inserted");   
       }
        else{
            res.send("cant insert due to server issue");
        }
        res.end();
    })
})
app.get("/disp",(req,res)=>{
    var sql="select * from facd";
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            res.json(result);
            console.log("1 record  inserted");   
       }
        else{
            res.send("cant insert due to server issue");
        }
        res.end();
    })
})
app.post("/dispdept",(req,res)=>{
    let t1=req.body.t1;
    var sql="select * from facd where dept="+con.escape(t1);
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            res.json(result);
            console.log("1 record  inserted");   
       }
        else{
            res.send("cant insert due to server issue");
        }
        res.end();
    })
})
app.post("/dispdesig",(req,res)=>{
    let t1=req.body.t1;
    var sql="select * from facd where desig="+con.escape(t1);
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            res.json(result);
            console.log("1 record  inserted");   
       }
        else{
            res.send("cant insert due to server issue");
        }
        res.end();
    })
})
app.listen(2223,()=>{
    console.log("Listening port :2223")
});
