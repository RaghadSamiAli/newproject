const express = require('express');
const router = express.Router();
import db from "../models";

async function countingeach (req,res,authors){
    for (const author of authors) {
        const data = author.authorid
        const name = author.authorname
        const countfun = await db.Book.count({ where: { authorid: data } });
        
        console.log(countfun);
        if (countfun) {
            if(countfun != author.bookscount){
            await db.Author.update({ bookscount: countfun }, { where: { authorid: data } })
                .then(result => {
                    if (result == 1) {
                        res.write("updated auther " + name + " has " + `${countfun}` + " books, ")
                    } else if (result == 0) {
                        res.write("not updated auther " + name + " has " + `${countfun}` + " books, ")
                    } else if (!result) {
                        res.write("error with  auther " + name + " has " + `${countfun}` + " books, ")
                    }
                })
            } else if (countfun == author.bookscount) {
                res.write("not updated (same as before) auther " + name + " has " + `${countfun}` + " books, ")
        }
        } if (!countfun) {
            return res.end("ERROR with author : ", name ," " , data)
        }
        
    }
    return;

}
async function secondFunction(req,res,authors){
    await countingeach(req,res,authors);
    // now wait for firstFunction to finish...
    // do something else
    res.end("..all done")
  };
router.post('/cron/countbooks', async(req, res) => {
    
    const {authorid} = req.body
  console.log(authorid)
    const authors = await db.Author.findAll();
 
    secondFunction(req,res,authors)
    

  })
module.exports = router;