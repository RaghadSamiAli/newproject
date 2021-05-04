import { UserInputError } from 'apollo-server';
import { isAuthenticated, isSessionAuthenticated ,isAuthenticatedlogin,isAdmin} from './authorization';
import { combineResolvers } from 'graphql-resolvers';
import {Op} from 'sequelize';
import { ForbiddenError, PersistedQueryNotFoundError } from 'apollo-server-express';
const fs = require('fs');
import path from 'path';
export default {
  Query: {
    // ! This query is for the loggsed in user
    getallbooks: combineResolvers(
      async (root, args, { db }, info) => {
           
   
      const content = fs.readFileSync('./testest.json', 'utf8');
          return JSON.parse(content)
 
        
//  console.log("finding All Books ")
//       const books = await db.Book.findAll({
//         include: [{
//         model: db.Author
//     },{model:db.Category}
//   ]});
//       console.log(books)
//         if (books) {
 /////////////////////////
      //     console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      //     var json = JSON.stringify(books);
      //     console.log(json)
      //     console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      //  fs.writeFileSync('./testest.json', json, function(err) {
          // if (err) throw err;
          //console.log("Wrote sitemap to XML");
          //  return books
        
        // });
        // }
      
  
      }),
          getBooksbyAuthor:combineResolvers(
            isAuthenticated,
            async (root, { input }, { db, me }) => {
              console.time('counterstarted')
              const authorid = input.authorid
              const books = await db.Book.findAll({where: {authorid},
                include: [{
                model: db.Author
            },{model:db.Category}
          ]});

return books;
      
            
              }),
              getBookbypk:combineResolvers(
                isAuthenticated,
                        async (root, { isbn }, { db, me })=> {
                          
                          const book = await db.Book.findByPk(isbn,{
                            include: [{
                            model: db.Author
                        },{model:db.Category}
                      ]});
                        console.log(book)
                          return book
                          }),
    },
    
  Mutation: {
    // ! This mutation creates new user
    FindorCreateBook: combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
          const authorid= input.authorid;
          const isbn = input.isbn;
          console.log(isbn)
          const bookcheck = await db.Book.findOne({where: {isbn},
            include: [{
            model: db.Author
        },{model:db.Category}
      ]});
         // const bookcountupdate = await db.Book.count({where: {authorid}})
         // const updateauthorcount = await db.Author.update({bookscount:bookcountupdate}, {where: { authorid }});
        if (bookcheck){
          console.log('found')
          
          return bookcheck;
        }
      const book= await db.Book.create({
         ...input}
      );
if(!bookcheck){console.log(book)
  
        return book
      }
    }),
    EditBook:combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
          const isbn = input.isbn;
          console.log(isbn)
     
          const bookcheck = await db.Book.findOne({where: {isbn}});
          const updatebook = await db.Book.update({...input}, {where: { isbn }});
          const book = await db.Book.findOne({where: {isbn}});
        
        // console.log(authorcheck);
if(!bookcheck){
  throw new Error('bookdoesnt excist');
}


      if (bookcheck){
      if (updatebook == 0 ){
        throw new Error('Cannot update|| Somethine went wrong');
      }
      if (updatebook == 1){
        return book
      }
        }
    
    }
    ),deleteBook:combineResolvers(
      isAuthenticated,isAdmin,
      async (root, { input }, { db, me }) => {
          const isbn= input.isbn;
          console.log("deleting author..." , isbn)
          const bookdelete = await db.Book.destroy({where: { isbn }});
 


if(bookdelete == 0){
 // throw new Error (false+'Error, post might me deleted')
  return false
  
}else if (bookdelete== 1){
  return true
}else{
  throw new Error ( 'error,unkown error')
}



    
    }
    ),
    
  }, 
  
};