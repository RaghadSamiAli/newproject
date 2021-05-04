import { UserInputError } from 'apollo-server';
import { isAuthenticated, isSessionAuthenticated ,isAuthenticatedlogin,isAdmin} from './authorization';
import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';
import { skip } from 'graphql-resolvers';
import { ForbiddenError ,PersistedQueryNotFoundError} from 'apollo-server-express';
import { parse } from 'graphql';
export default {
  Query: {
    // ! This query is for the logged in user
    getCategories: combineResolvers(
      isAuthenticated,
      async (root, args, { db }, info) => {
        const category = await db.Category.findAll();
  
        return category
       //   res.status(200).send('Bad Request')
      //   if (!categorys) {
      //     new ForbiddenError('Already Authenticated')
      //   } else if (categorys) {
         
      //     return categorys
      //   } else {
      //    throw new Error('err')
      //  }
        
      }),
    getCategoryByName: combineResolvers(
      isAuthenticated, isAdmin, async (root, { categoryname }, { db, me }) => {

        const category = await db.Author.findOne({
          where: {
            categoryname: {
              [Op.like]: '%' + categoryname + '%'
            }
          }
        })
        if (category) {
          return category
        } else {
          throw new Error('category doesnt excist');
        }
                         
                          })
                          ,getCategoryById:combineResolvers(
                            isAuthenticated,isAdmin,
                            async (root, { categoryid }, { db, me })=> {
                              const category = await db.Author.findOne({
                                where: {
                                  categoryid:categoryid  
                                }
                              })
                              if (category) {
                                return category
                              } else {
                                throw new Error('category doesnt excist');
                              }
                            }),
              
    },
    
  Mutation: {
    // ! This mutation creates new user
    createCategory: combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
         input.userid = me.userid
  console.log(input.userid)   
   const bookreq= await db.Category.create({
         ...input});
        return Category
    }),
    EditCategory:combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
        const categoryid = input.categoryid;
        const Categorycheck = await db.Category.findOne({where: {categoryid}});
        
    if(!Categorycheck){
    throw new Error('Notupdated_Doesntexcist');
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
const updatebookreq = await Categorycheck.update({...input}, {where: { categoryid }});
      return updatebookreq //JSON.parse(updatebookreq)

    }
      
    }
    ),deleteBookReq:combineResolvers(
      isAuthenticated,isAdmin,
      async (root,  {bookreqid} , { db, me }) => {
  console.log('book id is : ' + bookreqid)
        const bookreqcheck = await db.Bookreq.findOne({where: {bookreqid}},{ returning: true });
        
        if(!bookreqcheck){
          throw new Error('bookdoesnt excist');
        }
        const bookreqDelete = await bookreqcheck.destroy().then(() => true).catch(() => false);
          if (bookreqcheck){
            return bookreqDelete
      
          }
       
    }
    ),
  }, 
  
};