const Sequelize = require('sequelize');
const UserModel = require('../models/user');

const db = process.env.DB;
const user = process.env.DB_USER;
const host = process.env.DB_HOST || 'localhost';
const password =  process.env.DB_PASSWORD;

const sequelize = new Sequelize(db,user,password,{
    host: host,
    dialect: 'mysql'
});


const User = UserModel(sequelize,Sequelize);

sequelize.sync({force: false}).then(()=>{
    console.log('Database connected........ Tables created successfully');
}, (err)=>{
    throw err;
})

module.exports= {
    User
}