
const mongooes = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'})

const userId =  'mongoDEV';
const password = 'mongoDEV';
// const userId =  encodeURIComponent('dev_test') ; // special chracater username or password requied to be encoded
// const password = encodeURIComponent('dev@test@123'); // special chracater username or password requied to be encoded
const dbName = 'mern'
let uri = `mongodb+srv://${userId}:${password}@expenseapi.goppblo.mongodb.net/${dbName}`;
// let uri = process.env.DATABASE; 

mongooes.connect(uri).then(() => {
  console.log('connection successful');
}).catch((err) =>{
  console.log(`Error connecting to MongoDB ${err}`);
});