
User = require('../../models/user')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
bcrypt = require('bcryptjs')


module.exports = {
    login: async (args, req) => {
        
        const user = await User.findOne({email: req.body.variables.email.toLowerCase().trim()})
        if(!user) {
            throw new Error("invalid credentials")
        };
        const isEqual = await bcrypt.compare(req.body.variables.password, user.password)

        if(!isEqual || !user) {
            throw new Error("invalid credentials")
        }

        const token = jwt.sign({userId: user.id, email: user.email}, 'nfbsecretkey', {
            expiresIn: '24h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    },
    forgotPassword: async (args, req) => {
        try {
            console.log("process.env.Email", process.env.EMAIL)
            console.log("process.env", process.env.EMAIL)
            const user = await User.findOne({email: req.body.variables.email.toLowerCase().trim()})
            if(!user) {
                return {
                    status: 0
                }
            };



            const temporaryPassword = Math.random().toString(36).slice(-8);

            const hashPassword = await bcrypt.hash(temporaryPassword,12);

            const userDetailsEdit = {
                name: user.name.toLowerCase(),
                password: hashPassword,
                email: user.email.toLowerCase().trim(),
                tel: user.tel,
            }

            const userEdited = await User.findOneAndUpdate( {_id: mongoose.Types.ObjectId(user._id)}, userDetailsEdit, {upsert: true})

            // let account = await nodemailer.createTestAccount();

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            });

            // let transporter = await nodemailer.createTransport({
            //     sendmail: true,
            //     host: account.smtp.host,
            //     port: account.smtp.port,
            //     secure: account.smtp.secure,
            //     auth: {
            //         user: account.user,
            //         pass: account.pass
            //     }
            // });

            const mailOptions = {
                from: 'nfbapp1@gmail.com',
                to: 'urielc999@walla.com',//userEdited.email,
                subject: 'NFB - Change password',
                html: `<p>Hi ${userEdited.name}, </p>
                       <p>Your temporary password is ${temporaryPassword}</p>`
            };
            
            await transporter.sendMail(mailOptions)

            return {
                status: 1
            }

        } catch (err) {
                console.log(err);
            }
        }
}