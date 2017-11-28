var commontModel = require ('./../model/commont')

var Commont = function () {}

Commont.prototype.read(id).then((req, res) => {
    "use strict";
    let commont = new commontModel();
    let id = req.query.id
    commont.read(id).then(result => {
        console.log(result)
    }, error => {
        console.log(error)
    })
})