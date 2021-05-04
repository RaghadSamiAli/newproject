import { UserInputError } from 'apollo-server';
import { isAuthenticated, isSessionAuthenticated ,isAuthenticatedlogin,isAdmin} from './authorization';
import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';
import { skip } from 'graphql-resolvers';
import { ForbiddenError ,PersistedQueryNotFoundError} from 'apollo-server-express';
import { parse } from 'graphql';
import { getDistance } from 'geolib';
const GeoPoint = require('geopoint');
export default {
  Query: {
    // ! This query is for the logged in user
    getFaqs: combineResolvers(
      isAuthenticated,
      async (root, args, { db }, info) => {
        const faq = await db.Faq.findAll();
        return faq
      }),getsheppingdis:combineResolvers(
                            isAuthenticated,isAdmin,
                            async (root, { shippingid }, { db, me })=> {
                              const shipping = await db.Shippingadd.findOne({
                                where: {
                                  shippingid:shippingid  
                                }
                              })
                              if (shipping) {
                                console.log (shipping.lat , shipping.lag)
                             //   const shippingpoint = new GeoPoint(`${shipping.lat}`,`${shipping.lag}`);
                               // const storelocation = new GeoPoint(32.541777,35.854122);
                                var distance = getDistance(
                                  { latitude: shipping.lat, longitude: shipping.lag },
                                  { latitude: 32.541777, longitude: 35.854122}
                              );
                              console.log(distance)
                                return distance
                                
                              } else {
                                throw new Error('category doesnt excist');
                              }
                            }),
              
    },
    
  Mutation: {
    // ! This mutation creates new user
    createFaq: combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
         input.userid = me.userid
  console.log(input.userid)   
   const faq= await db.Faq.create({
         ...input});
        return faq
    }),
    EditFaq:combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
        const faqid = input.faqid;
        const faqcheck = await db.Faq.findOne({where: {faqid}});
        
    if(!faqcheck){
    throw new Error('faq doesnt exsist');
    } else {
      
//       var smsbody = "Category "+ categoryid + " with name " + Categorycheck.name + " has canged to " + input.name
//       let fetch = require('node-fetch');
//       var urlsms = "https://smschef.com/system/api/send?key=243105ee6dff3423466fe0c2eecbbef3e072b25f&phone=962789994108&message="+smsbody
// fetch(urlsms, {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: '{}'
// }).then(response => {
//   if (response.status == 200){
//     console.log("sent seccusfully")
//   }else {
//     console.log(response)
//   }
  
// }).catch(err => {console.log(err);});
const updatefaq = await faqcheck.update({...input});
      return updatefaq //JSON.parse(updatebookreq)

    }
      
    }
    ),deleteFaq:combineResolvers(
      isAuthenticated,isAdmin,
      async (root,  {faqid} , { db, me }) => {
        const faqcheck = await db.Faq.findOne({where: {faqid}},{ returning: true });
        if(!faqcheck){
          throw new Error('bookdoesnt excist');
        }else {
          const faqdelete = await db.Faq.destroy({where: {faqid}});
          return JSON.parse(faqdelete);
        }
       
    }
    ),
  }, 
  
};