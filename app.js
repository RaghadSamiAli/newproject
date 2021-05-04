require('dotenv').config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {makeExecutableSchema} from "apollo-server";
import db from "./models";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schemas";
import http from "http";
import session from "express-session";
import path from 'path';
import cookieParser from "cookie-parser";
const bodyParser = require("body-parser");
import cors from "cors";
import methodOverride from "method-override";
import sequelize from "sequelize";
const compression = require('compression')
// ! initialize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// ! Declare express application
const app = express();
app.use(compression())
// ! Middleware express
app.use(cookieParser());


app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.APP_SECRET,
    store: new SequelizeStore({
      db: db.sequelize,
    }),
    resave: false, // we support the touch method so per that express-session docs this should be set to false
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == "production",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
    },
  })
);

app.use(
  cors({
   // origin: ["http://localhost:5000"],
    credentials: true,
  })
);

// defining Graphql Schema:
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
// ! Apollo server creation
const server = new ApolloServer({
   schema,
    introspection: true,
    cors: true,
    context: async ({ req, res, connection }) => {
      if (req) {
        return {
          db,
          res,
          session: req.session,
          me: req.session.user,
          secret: process.env.APP_SECRET,
        };
      }
    },
  });
  
  server.applyMiddleware({ app, path: "/graphql", cors: false });
  
  const httpServer = http.createServer(app);
  const {Item , Order , Shippingadd} = require('./models')
const modelat = {Item , Order , Shippingadd};
//Item.sync({ force: true  }),
//Order.sync({ force: true  }),
//Shippingadd.sync({ force: true  })
//.then(results=> {
   //console.log(`database synced!`);
 // });
app.listen(3000,"localhost", console.log('server started on port ', 3000));
  
  httpServer.listen({ port: process.env.PORT, host:"0.0.0.0" }, () => {
    console.log(
      `Apollo server ready at http://localhost:${process.env.PORT}/graphql`
    );
  });

// syncing tables
//require('./controllers/tablesync');
 //starting server localhost
//app.listen(PORT, console.log('server started on port ',PORT));

/////// using express and method override for http requests
app.use(express.json());
//app.use(bodyParser.json)
app.use(methodOverride('_method'));
////////////////////////////////////////////////



//cron  Functions
app.use(require('./routes/countbook'));

//// create edit delete Post
//app.use(require('./routes/post'));

// like dislike route
//app.use( require('./routes/like'));

/// login function
//app.use( require('./routes/login'));

// comment function
//app.use( require('./routes/comment'));
// notification function
//app.use( require('./routes/notification'));

// 
//app.use( require('./routes/friend'));
