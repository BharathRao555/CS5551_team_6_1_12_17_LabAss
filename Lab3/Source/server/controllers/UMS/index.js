
module.exports = function(app) {
    app.post('/api/authenticate', function(req, res) {
        var user = req.body;
        console.log(user);
        res.status(200).send(
            { success: true , message:"User authenticated successfully.",user:user}
        );
    });
}