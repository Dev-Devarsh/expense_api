const mongooes = require('mongoose');
const collectionName = 'expenses'
const expensesSchema = new mongooes.Schema({
    date: String,
    price: Number,
    title: String
})

const profileSchema = mongooes.model(`${collectionName}`, expensesSchema);
module.exports = profileSchema;