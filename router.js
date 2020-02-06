"use strict";
/*
 * check if routed handler function exists
 * if yes call it, else complain
 */
const handlers = require("./handlers");               // handlers module

/*modulet sætter et key word og sætter en værdi. 
* Her er værdier funktioner, hvor man normalt ser en string
* eller en værdi. Typeof leder efter en function, så
* den virker ikke uden en funktione. 
*/
const requestHandlers = {                             // application urls here
    "/": handlers.home,
    "/index.html": handlers.home,
    "/about.html": handlers.side,
    "/contact.html": handlers.side,
    "/notfound": handlers.notfound,
    "js": handlers.js,
    "css": handlers.css,
    "png": handlers.png,
    "jpeg": handlers.png
}

module.exports = {
    route(req, res) {
        let arr = req.url.split(".");
        let ext = arr[arr.length - 1];
        if (typeof requestHandlers[req.url] === 'function') {  // look for route
            requestHandlers[req.url](req, res);                // if found use it
        } else if (typeof requestHandlers[ext] === "function") {
            requestHandlers[ext](req, res);
        } else {
            console.log("5: " + ext);
            requestHandlers["/notfound"](req, res);        // use notfound
        }
    }
}