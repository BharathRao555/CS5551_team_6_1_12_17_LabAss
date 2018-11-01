const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Connection Established ! Listening at port : '+port);
});
var cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'StudentDetails.html'));
});
const CoinRouter = require('./routes/CoinRouter');

//app.use('/coins', CoinRouter);
require('./controllers/UMS/index')(app);
require('./controllers/external/index')(app);

// error handler
app.use(function(err, req, res, next) {
    // Website you wish to allow to connect
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;