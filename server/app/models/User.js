import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import applyDotenv from '../lambdas/applyDotenv.js'

export default function UserModel(mongoose) {
    const {jwtSecret} = applyDotenv(dotenv)
    const userSchema = mongoose.Schema({
        userid: String,
        password: String,
        email: String,
        name: String,
        phone: String,
        birth: String,
        address: String,
        token: String
    }, {timestamps: true})

    userSchema.pre("save", function (next) {
        let user = this;
        console.log(this);
        const saltRounds = 10
        // plain password 가 아니더라도 해시하고 저장해서 비밀번호 망가지는 버그 있음.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) 
                return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) 
                    return next(err);
                console.log(user.password);
                console.log(hash);
                user.password = hash;
                next();
            });
        });
    })
    userSchema.methods.comparePassword = function (plainPassword, cb) {
        //cb는 (err,isMatch)이다. plainPassword 유저가 입력한 password
        
        console.log(' >> plainPassword >> ' + plainPassword)
        console.log(' >> this.password >> ' + this.password)
        bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
            console.log(err)
            if (err) {
                return cb(err)
            } else {
                console.log(' >> isMatch >> ' + isMatch)
                return cb(null, isMatch);
            }
        })
    }
    userSchema.methods.generateToken = function (cb) {
        var user = this;
        // json web token 이용하여 token 생성하기 user id 와 두번째 param 으로 토큰을 만들고, param 을 이용하여
        // 나중에 userid를 찾아낸다.

        console.log(" jwtSecret >> " + jwtSecret)
        var token = jwt.sign(user._id.toHexString(), jwtSecret)

        user.token = token
        console.log(user);
        user.save(function (err, user) {
            if (err) 
                return cb(err);
            cb(null, user)
        })
    }
    userSchema.statics.findByToken = function (token, cb) {
        var user = this;

        //userid를 찾으면 위에서 secret으로 넣어준다. 여기서 decode는 user_id(위에서 넘겨준)가 될 것이다.
        jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
            //이 아이디와 토큰을 가진 유저를 찾는다.
            user.findOne({
                "_id": decode,
                "token": token
            }, function (err, user) {
                if (err) 
                    return cb(err);
                cb(null, user);
            })
        })
    }
    return mongoose.model('uesr', userSchema)
}