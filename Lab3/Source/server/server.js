const express = require('express');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');
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

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'bashiresh@gmail.com',
            clientId: '226810804230-pf1kvja7efumrnam3f1ivreurpnj5imm.apps.googleusercontent.com',
            clientSecret: 'UtR2QyKkpl5dokr_onXpZJNl',
            refreshToken: '1/EWo4Gr2jPMqBSKJKiAhPC7nikZN_9B_uizvDp-f5GEjX8sTjr71B0j3OrE0Qe7EL'
        })
    }
}));

var mailOptions = {
    from: '<bashiresh@gmail.com>',
    to: 'ebharath94@gmail.com',
    subject: 'Node Mailer Application Test for Lab3',
    text: 'This is Sample mail to show the demo for node mailer which is required for Lab Assignment3'
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log(err);
        console.log('Error');
    } else {
        console.log('Email Sent');
    }
})

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