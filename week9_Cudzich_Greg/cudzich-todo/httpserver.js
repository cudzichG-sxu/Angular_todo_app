var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');
var schema = require('./schemaFile.js').schemaActual;
var modelActual = mongoose.model('modelActual', schema);
const milliTimestamp = new Date().getTime();
//utilized for fixing CANNOT GET route
const history = require('connect-history-api-fallback');

mongoose.connection.once('open', function() {
    app.use(express.json());
    app.post('/listItemActual', function(request, res) {
        var savePkg = request;
        //needed to parse through the body and the JSON object to get to the actual value of the payload
        //achieved by using savePkg.body.listItem
        console.log(savePkg.body.listItem);
        if (savePkg.body.listItem === undefined) {
            console.log("THE DATA IS EMPTY!");
        } else {
            var newItem = new modelActual({
                listItem: savePkg.body.listItem,
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
                    res.send(JSON.stringify(doc));
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

    app.use('/deleteItem', express.query());
    app.delete('/deleteItem', function(request, response) {
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

    app.use(express.json());
    app.put('/updateItem', function(request, response) {
        var updatePkg = modelActual.updateOne({_id: request.query.id},{$set: { "listItem":request.body.listItem}});
        updatePkg.exec(function(err) {
            if(err) {
                console.log("error updating item in database" + err);
                response.status(404);
                response.send(JSON.stringify(err));
            } else {
                response.status(200);
                response.send(JSON.stringify({}));
            }
        })
    });

    //Begin block of code that fixes error of CANNOT GET route
    app.use(express.static('front-end/dist/front-end/'));
    app.use(history({
        disableDotRule: true,
        verbose: true
    }));
    app.use(express.static('front-end/dist/front-end/'));
    app.get('/', function(req, res) {
        res.render(path.join(__dirname + '/dist/index.html'));
    });
    //end block of code that fixes error of CANNOT GET route

    app.listen(8080, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Application launched and running");
        }
    })
});