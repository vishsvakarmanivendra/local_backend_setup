// import { Sequelize } from "sequelize";
// import dotenv from "dotenv"
// import mysql2 from "mysql2"
// dotenv.config()

// const sequelize = new Sequelize(process.env.MYSQL_URL, {
//     dialect: 'mysql',
//     logging: false,
//   });
// sequelize.authenticate().then(result=>{
//     console.log(result);
// }).catch(err=>{
//     console.log(err);
// });

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import mysql2 from "mysql2"
dotenv.config()

const sequelize = new Sequelize("himanshu",process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, {
    host: "localhost",
    dialect: 'mysql',
    dialectModule: mysql2
});

sequelize.authenticate().then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
});

export default sequelize;





