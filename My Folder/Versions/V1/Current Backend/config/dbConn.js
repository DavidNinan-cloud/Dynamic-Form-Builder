const fncreateDatabase = require('../queries/fnCreateDatabase')

const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: 'david',
  host: 'localhost',
  database: 'client-app',
  password: '123456',
  port: 5432,
})

// const connectDBA = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }
const connectDB = async () => {
    try {
        await pool.connect().then((client) => {
            console.log("pg connected");
            pool.query(fncreateDatabase, (error, results) => {
            if (error) {
                console.error(error);
            }else{
                console.log('fncreateDatabase success');
            }
                })
        });
    } catch (err) {
        console.error(err);
    }
}


module.exports = {connectDB,pool}