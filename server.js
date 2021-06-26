const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');


require('dotenv').config({
    path:'./config/config.env'
});
const app = express();

if(process.envNODE_ENV){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

//load all routes

const authRouter = require('./routes/auth.route')

app.use('/api/',authRouter);

app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"page not founde"
    })
});
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
});