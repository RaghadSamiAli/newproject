const { Sequelize } = require('sequelize');

const { sequelize,Rtoken,  User, Post , Like , Notification , Friend , Profile, Comment}  = require('../models')
// syncing tables ...
console.log('syncing tables..');
//  User.sync({force : false}).then(() => {
//   console.log('User table synced');
//  });

//  Post.sync({force : false}).then(() => {
//     console.log('Post table synced');
//  });

//  Notification.sync({force : true}).then(() => {
//     console.log('notification table synced');
//   });
// // //  Friend.sync({force : false}).then(() => {
// // //    console.log('friend table synced');
// // //  });
//   Comment.sync({force : true}).then(() => {
//     console.log('comment table synced');
//   });

//  Like.sync({force : false}).then(() => {
//     console.log('Like table synced');
//  }).then(() => {
//     console.log('all table synced');
    
//  });
   
sequelize.sync({force : false}).then(() => {
   console.log('All table synced');
});
