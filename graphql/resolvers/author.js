import { UserInputError } from 'apollo-server';
import { isAuthenticated, isSessionAuthenticated ,isAuthenticatedlogin,isAdmin} from './authorization';
import { combineResolvers } from 'graphql-resolvers';
import {Op} from 'sequelize';
import { ForbiddenError ,PersistedQueryNotFoundError} from 'apollo-server-express';

export default {
  Query: {
    // ! This query is for the logged in user
    getallAuthers: combineResolvers(
      isAuthenticated,
      async (root, args, { db }, info) => {
      const author = await db.Author.findAll({include: [{ model: db.Book }]});
      return author
      }),
      getAutherbyid: combineResolvers(
        isAuthenticated,
        async (root, { input }, { db, me }) => {
          const authorid = input.authorid
          const author = await db.Author.findByPk({where: {authorid},include: [{ model: db.Book }]});
          return author
          }),getAutherbypk: combineResolvers(
            isAuthenticated,
            async (root, { authorid }, { db })=> {
              //finding author ...
              const author = await db.Author.findByPk(authorid,
                //Add Books of author using include
                {include: [{
                model: db.Book 
            }]});
              return author
          }),
              
          
    },
    
  Mutation: {
    // ! This mutation creates new user
    FindorCreateAuthor: combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {

          const authorname = input.authorname;
          console.log(authorname)
          const authorcheck = await db.Author.findOne({
            where: {
              authorname: {
                [Op.like]: '%'+authorname+'%'
              }
          }
        ,include: [{ model: db.Book }]});
        if (authorcheck){
          return authorcheck;
        }
      const author= await db.Author.create({
         ...input}
      );
console.log(author)
        return author
    }),
    EditAuthor:combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
          const authorid = input.authorid;
          console.log(authorid)
     
          const authorcheck = await db.Author.findOne({where: {authorid},include: [{ model: db.Book }]});
          const updateauther = await db.Author.update({...input}, {where: { authorid }});
          const author = await db.Author.findOne({where: {authorid},include: [{
            model: db.Book
        }]});

if(!authorcheck){
  throw new Error('Author does not excist');
}
      if (authorcheck){
      if (updateauther == 0 ){
        throw new Error('Cannot update|| Somethine went wrong');
      }
      if (updateauther == 1){
        
        return author

      }
        }
    }
    ),deleteAuthor:combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
          const authorid= input.authorid;
          console.log("deleting author..." , authorid)
          const authordelete = await db.Author.destroy({where: { authorid }});
 


if(authordelete == 0){
 // throw new Error (false+'Error, post might me deleted')
  return false
  
}else if (authordelete== 1){
  return true
}else{
  throw new Error ( 'error,unkown error')
}



    
    }
    ),
    
  },
};