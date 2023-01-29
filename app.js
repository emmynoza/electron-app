const express = require('express')
// const ffmpegPath = require('ffmpeg-static');
// Stream = require('node-rtsp-stream');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');
var index = require('./routes/index');
const { join } = require('path');
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

let rawdata = fs.readFileSync(path.join(__dirname, '/routes/beo-template.json'));

let data = JSON.parse(rawdata)

app.get('/all', (req, res) => {
    res.send(data)
})

// Add items

app.get('/addItem/:section/:subSection/:item?', addItem)

function addItem(req, res) {
    var values = req.params;

    let item = values.item

    if (!item) {
        reply = {
            msg: "item is required"
        }
    } else {


        let endpoint = data[values.section][values.subSection]
        console.log(endpoint);

        // console.log(values.section, Object.keys(data));

        // console.log(Object.keys(data)[0] == values.section);


        if (Object.keys(data).includes(values.section)) {

            data[values.section][values.subSection].push(item)

            let newData2 = JSON.stringify(data, null, 2);

            fs.writeFile(path.join(__dirname, '/routes/beo-template.json'), newData2, err => {
                if (err) throw err;
                console.log("new data added");
            })




        } else {
            return false
        }

        reply = {
            msg: "Thank you for your item"
        }
    }

    res.send(reply)
}

app.get('/delete/:section/:subSection/:item?', deleteItem)

function deleteItem(req, res) {
    let values = req.params

}

function finished() {
    console.log('finished');
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const server = app.listen(3000, () => console.log('Express Server listening on port 3000'));

module.exports = app