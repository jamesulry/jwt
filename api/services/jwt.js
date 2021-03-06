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

exports.decode = function(token, secret) {
    var segments = token.split('.');

    if (segments.length !== 3) {
        throw new Error('Token structure incorrect');
    }

    var header = JSON.parse(base64Decode(segments[0]));
    var payload = JSON.parse(base64Decode(segments[1]));

    var rawSignature = segments[0] + '.' + segments[1];

    if (!verify(rawSignature, secret, segments[2])) {
        throw new Error('Verification failed');
    }

    return payload;
};

function base64Encode(str) {
    return new Buffer(str).toString("base64");
}

function base64Decode(str) {
    return new Buffer(str, 'base64').toString();
}

function sign(str, key){
    return crypto.createHmac("sha256", key).update(str).digest("base64");
}

function verify(raw, secret, signature) {
    return signature === sign(raw, secret);
}