const { User , Rtoken} = require('../models')
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rtoken = require('../models/rtoken');

function login(req, res) {
    const { email, password } = req.body;
    if (!email & !password) {
        res.send('password and email are empty !');
    } else if (!email) {
        res.send('enter email');
    } else if (!password) {
        res.send('enter password');
    } else if (email || password) {
        // The following code return an instance of the user if it was found.
        User.findOne({ where: { email } })
            .then(user => {
                const usert = { name:user.name , userid:user.userid };
                
                if (user) {// check if email exist in db
                    bcrypt.compare(password, user.password, function(err, ress) {
                        if (err){
                          // handle error
                            res.json(err)
                        }
                        if (ress){
                          // Send JWT
                            console.log("auth ok")
                           
                          console.log("login seccusful")
                          function generateAccessToken(usert) {
                          return jwt.sign(usert, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
                              }
                           
                            

                                        const refreshToken = jwt.sign(usert, process.env.REFRESH_TOKEN_SECRET)
                                        const accessToken = generateAccessToken(usert)
                           
                                Rtoken.findOrCreate({ where: { userid: user.userid }, defaults: { userid: user.userid, refresh: refreshToken , atoken:accessToken, name:user.name  } })
                            .then(function(rtoken, created) {
                                if (rtoken) {
                                    Rtoken.update({ refresh: refreshToken , atoken:accessToken, name:user.name }, { where: {  userid: user.userid } })
                                    console.log('tokens table updated')
                          
                                } if (created) {
                                    console.log('tokens table created')
                                }
                             
                        
                            })
                            userid = user.userid
                            console.log(userid)
                            res.cookie('authuserid', userid, { maxAge: 9000000 })
                            
                            res.cookie('authorization', accessToken, { maxAge: 9000000 })
                            res.cookie('authlogged', 'yes', { maxAge: 9000000 })
                                res.json({ success: true, message: 'logged in seccusfully' })
                                
                       
                             
                
                       
                        } else {
                          // response is OutgoingMessage object that server response http request
                          return res.json({success: false, message: 'passwords do not match'});
                        }
                      });
                    // The following code chech for password
                  
                     
                } else if (!user) {  /// if email is not there :
                    res.status(500).json("error: " + "Email " + email + " does not exist")
                }
            }).catch(err => {
          
                return res.status(500).json("user not found")
              
            });
        
    } else {
        res.status(500).json("Bug found !, contact the administrator");
    }
}


module.exports = { login};