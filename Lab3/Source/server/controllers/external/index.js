var request = require('request');
module.exports = function(app) {
    var query='https://api.mlab.com/api/1/databases/students/collections/studentDetails?apiKey=MrfpkboO2errNtfksqJXEHStAEXSX9ah';
    var alterquery='https://api.mlab.com/api/1/databases/students/collections/studentDetails';
        var key='?apiKey=MrfpkboO2errNtfksqJXEHStAEXSX9ah';
    app.get('/Hiresh/Create', function(req, res) {
        res.contentType("application/json");
        console.log(req);
       request.post({
               url: query,
               method: 'POST',
               json: {
                   "ClassID": req.query.id,
                   "StudentName": req.query.name,
                   "CourseofStudy": req.query.cos,
                   "Major": req.query.major,
                   "Minor": req.query.minor
               }
           }
       ).pipe(res);
    });
    app.get('/Hiresh/Get', function(req, res) {
        res.contentType("application/json");
        request.get(query).pipe(res);
    });
    app.get('/Hiresh/Search', function(req, res) {
        res.contentType("application/json");
        request.get(query+'&q={"Major":"'+req.query.major+'"}').pipe(res);
    });
    app.get('/Hiresh/Update', function(req, res) {
        res.contentType("application/json");

        request.put({
                url: alterquery+'/'+req.query.oid+key,
                method: 'PUT',
                json: {
                    "ClassID": req.query.id,
                    "StudentName": req.query.name,
                    "CourseofStudy": req.query.cos,
                    "Major": req.query.major,
                    "Minor": req.query.minor
                }
            }
        ).pipe(res);
    });
    app.get('/Hiresh/Delete', function(req, res) {
        res.contentType("application/json");

        request.delete({
                url: alterquery+'/'+req.query.oid+key,
                method: 'DELETE'
            }
        ).pipe(res);
    });
}