import { UserInputError } from 'apollo-server';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Op } from 'sequelize';
const zlib = require('zlib');
import { isAuthenticated, isSessionAuthenticated ,isAuthenticatedlogin,isAdmin} from './authorization';
import { combineResolvers } from 'graphql-resolvers';
function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
        }
export default {
  Query: {
    // ! This query is for the logged in user
    isLoggedIn: async (root, args, { session }, info) => {
      return isSessionAuthenticated(session);
    },
    me: combineResolvers(
      isAuthenticated,
      async (root, args, { db, me }, info) => {
        const user = await db.User.findByPk(me.userid);
        return user;
      }
    ),
    // ! This query grabs all the users
    users: combineResolvers(
      isAuthenticated, isAdmin,
      async (root, args, { db }, info) => {
        const users = await db.User.findAll();
        if (!users) {
          throw new Error('No users found');
        }
        return users;
      }
    ),
    },
    
  Mutation: {
    // ! This mutation creates new user
    createUser: async (root, { input }, { db, session }) => {
          const phone = input.phone;
          console.log(phone)
          const userExists = await db.User.findOne({ where: { phone:phone } });
          
      if (userExists) {
        throw new Error('A user with this phone already exists');
          }
          if (userExists == null) {
              console.log("user not found")
          }
      const user = await db.User.create({
        ...input,
      });

      session.user = {
        userid: user.dataValues.userid,
        phone: user.dataValues.phone,
        role: user.dataValues.role,
      };
      return user;
    },
    updatemyuser: combineResolvers(
      isAuthenticated,
      async (root, { input }, { db, me}) => {

      let userid = me.userid;
      console.log("updating user info ...", userid)
      const userExists = await db.User.findOne({ where: { userid } });
      
  if (!userExists) {
    throw new Error('user does not excist');
      }
      if (userExists) {
        console.log('user found')
          }
          console.log(" ...", userid)
  const updateuser = await db.User.update({
    ...input, 
  }, {where: { userid }});
  const user = await db.User.findOne({ where: { userid } });
      


if (updateuser == 1){
   return user 
}
if (updateuser ==0){
    return user

}

  
}),
      login: combineResolvers(
      isAuthenticatedlogin,
      async (root, { input }, { db, session }, info) => {
          const phone = input.phone;
         var password = input.password;

      const user = await db.User.findOne({
        where: { phone },
      });
      if (!user) {
        throw new UserInputError(`User with ${phone} does not exist`);
      }

      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new UserInputError('Password is invalid');
          }
          
  
  if(isValid){    session.user = {
        userid: user.dataValues.userid,
        phone: user.dataValues.phone,
        role: user.dataValues.role,
          };
 
      
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60s' })
      const accessToken = generateAccessToken(user)
         user.refreshToken = refreshToken;
         const options = {
            maxAge: 1000 * 60 * 60 * 24, //expires in a day
            // httpOnly: true, // cookie is only accessible by the server
            // secure: process.env.NODE_ENV === 'prod', // only transferred over https
            // sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
          }
          
       //   var smsbody = "Hello " + user.fullname + ", You had logged in seccussfuly to our amazing API! "
         // let fetch = require('node-fetch');
         // var urlsms = "https://smschef.com/system/api/send?key=243105ee6dff3423466fe0c2eecbbef3e072b25f&phone=962"+user.phone +"&message="+smsbody
         // // const custoom = {
    //        method: 'GET',
      //      compress: true, 
        //    gzip : true,
          //  headers: { 'Content-Type': 'application/json' , 'Accept' :'*/*', 'Accept-Encoding' : ''},
     //   }
      // await  fetch (urlsms, custoom )
     //  .then(response=>{
       //  console.log(body)
       //  console.log(response)
       //  console.log(response.body)
     //  })
      
      return user;
    
    }}),
    
    logout: combineResolvers(
      isAuthenticated,
      async (root, args, { session, res }, info) => {
      let loggedOutUser = session.user;
      await session.destroy();
      res.clearCookie(process.env.SESSION_NAME);
      return loggedOutUser;
    }),
  },
};