
var Q = require("q");

var id = 0;

exports.request = function (url, key) {
    var deferred = Q.defer();
    var script = document.createElement("script");
    var callbackName = "resolveJsonp" + id++;
    var join = url.indexOf("?") < 0 ? "?" : "&";
    script.src = url + join + key + "=" + callbackName;
    window[callbackName] = function (result) {
        deferred.resolve(result);
        delete window[callbackName];
    };
    document.head.appendChild(script);
    return deferred.promise;
};

