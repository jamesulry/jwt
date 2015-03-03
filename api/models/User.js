/**
 * Created by ssd on 3/3/15.
 */
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");


var UserSchema = new mongoose.Schema({
    email: String,
    password: String

});

UserSchema.methods.toJSON = function(){
    var user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.pre("save", function(next){
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt){
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
});


exports.model = mongoose.model("User", UserSchema);

