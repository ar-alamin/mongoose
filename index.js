const express = require('express');
const mongoose  = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

// express app initialization
const app = express();
app.use(express.json());

// database conncetion with mongoose
mongoose.connect('mongodb://localhost/todos')
    .then(()=> console.log('connection successfully'))
    .catch(()=> console.log(err))

// application route
app.use('/todo', todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
    if(res.headerSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('listening on the port 3000...');
});