const { app } = require('electron');
let express = require('express')
var router = express.Router();

let fs = require('fs');
let path = require('path');

let content = fs.readFileSync(path.resolve(__dirname, 'beo-template.json'))


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'DRR Clipboard' });
});


module.exports = router;