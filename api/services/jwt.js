/**
 * Created by ssd on 3/3/15.
 */
var crypto = require("crypto");


exports.encode = function(payload, secret) {
    var algorithm = "HS256";

    var header = {
        type: "jwt",
        algorithm: algorithm
    };

    var jwt = base64Encode(JSON.stringify(header)) + "." + base64Encode(JSON.stringify(payload));
    return jwt + "." + sign(jwt, secret);
};

function base64Encode(str) {
    return new Buffer(str).toString("base64");
}

function sign(str, key){
    return crypto.createHmac("sha256", key).update(str).digest("base64");
}