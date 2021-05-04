import { UserInputError } from 'apollo-server';
import { isAuthenticated, isSessionAuthenticated ,isAuthenticatedlogin,isAdmin} from './authorization';
import { combineResolvers } from 'graphql-resolvers';
import {Op} from 'sequelize';
import { ForbiddenError ,PersistedQueryNotFoundError} from 'apollo-server-express';
export default {
  Query: {
    // ! This query is for the logged in user
    getBookreqs: combineResolvers(
      isAuthenticated,
      async (root, { db, me }) => {
      const bookreqs = await db.Bookreq.findAll({
        include: [{
        model: db.User
    }
  ]});
      return bookreqs
      }),
          getBookreqbyid:combineResolvers(
            isAuthenticated,isAdmin, async (root, { bookreqid }, { db, me })=> {
                          const bookreq = await db.Bookreq.findByPk(bookreqid,{
                            include: [{
                            model: db.User
                        }
                      ]});
                          return bookreq
                          })
                          ,getBookreqByUser:combineResolvers(
                            isAuthenticated,isAdmin,
                            async (root, { userid }, { db, me })=> {
                            const bookreq = await db.Bookreq.findAll({where: {userid}});
                            return bookreq
                            }),
              
    },
    
  Mutation: {
    // ! This mutation creates new user
    createBookReq: combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
         input.userid = me.userid
  console.log(input.userid)   
   const bookreq= await db.Bookreq.create({
         ...input});
        return bookreq
    }),
    EditBookReq:combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
        const bookreqid = input.bookreqid;
        const bookreqcheck = await db.Bookreq.findOne({where: {bookreqid}});
        const bookreqUpdate = await bookreqcheck.Edit(input);
    if(!bookreqcheck){
    throw new Error('bookdoesnt excist');
    }
    if (bookreqcheck){
      
      return bookreqUpdate
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