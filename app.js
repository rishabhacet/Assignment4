
const express = require('express');
const app = express();
const morgan= require('morgan');
const route = express.Router();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/userRoutes');

//use of the middleware
if(process.env.NODE_ENV === 'development')
{
app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));


// reading the file from the top level 


app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});


//

//post route
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


app.all('*',(req,res,next)=>{
    // res.status(400).json({
    //     status:'fail',
    //     message:`invalid route ${req.originalUrl} on the server `
    
    // const err = new Error(`invalid route ${req.originalUrl} on the server`);
    // err.statusCode = 404,
    // err.status = 'fail'
    next(new AppError(`invalid route ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;