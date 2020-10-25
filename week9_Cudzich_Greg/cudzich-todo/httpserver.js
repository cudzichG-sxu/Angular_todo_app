var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');
var schema = require('./schemaFile.js').schemaActual;
var modelActual = mongoose.model('modelActual', schema);
const milliTimestamp = new Date().getTime();

mongoose.connection.once('open', function() {
    //needed to add app.use(express.json()) for request.body to be populated, was returning empty before
    // I guess body-parser is now inbuilt with express.js.
    app.use(express.json());
    app.post('/listItemActual', function(request, res) {
        var savePkg = request.body;
        if (savePkg.message === '') {
            console.log("THE DATA IS EMPTY!");
        } else {
            var newItem = new modelActual({
                listItem: savePkg.message,
                timestamp: milliTimestamp
            });
            newItem.save(function (err, doc) {
                if (err) {
                    console.log("error saving to database " + err);
                    res.status(404);
                    res.send(JSON.stringify(err));
                } else {
                    console.log("saved successfully to database " + doc);
                    res.status(200);
                    res.send(JSON.stringify({}));
                }
            });
        }
    });

    app.get('/list', function (req, res) {
        var query = modelActual.find()
        query.exec(function(err, docs) {
            if(err) {
                console.log("error pulling from database " + err);
                res.status(404);
                res.send(JSON.stringify(err));
            } else {
                res.status(200);
                res.send(JSON.stringify(docs));
            }
        });
    });

    app.use('/', express.query());
    app.delete("/", function(request, response) {
       var deletePkg = modelActual.deleteOne({_id: request.query.id});
       console.log(request.query);
        deletePkg.exec(function(err) {
            if(err) {
                console.log("error deleting from database" + err);
                response.status(404);
                response.send(JSON.stringify(err));
            } else {
                //I think either 202 or 200 is the correct status to serve
                //when deleting an item.
                response.status(202);
                response.send(JSON.stringify({}));
            }
        })
    });

    app.use(express.static('./public'));
    app.listen(8080, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Application launched and running");
        }
    })
});