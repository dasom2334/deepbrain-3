import jwt from 'jsonwebtoken'
import User from "@/models/User";
import "@/models/dbConnect";
import dotenv from 'dotenv'
import applyDotenv from '@/modules/lambdas/applyDotenv.js'

export default async (req, res) => {
	const { method } = req;
    const {jwtSecret} = applyDotenv(dotenv)
	switch (method) {
		case "POST":
            User.findOne({
                userid: req.body.userid
            }, function (err, user) {
                if (err) 
                    throw err
                if (!user) {
                    res
                        .status(401)
                        .send({success: false, message: '해당 ID가 존재하지 않습니다'});
                } else {
                    const isMatch = user.password == req.body.password;
                    if (!isMatch) {
                        return res
                            .status(401)
                            .send({message: 'FAIL'});
                    } else {

                        var token = jwt.sign(user._id.toHexString(), jwtSecret)

                        user.token = token;
                        user.save(function (err, user) {
                            if (err) {
                            return res
                            .status(400)
                            .json(err);
                        } else {

                            return res
                                .status(200)
                                .json(user);
                           
                        }
                    })
                    }
                    console.log(' ### 로그인 정보 : ' + JSON.stringify(user))
                }
            })
	}
};