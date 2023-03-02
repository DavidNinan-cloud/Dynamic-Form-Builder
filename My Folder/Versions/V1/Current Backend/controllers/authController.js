const bcrypt = require('bcrypt');
const {pool} = require('../config/dbConn')
const queries = require('../queries/login')
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleLogin = async (request, response) => {
    const { user, pwd } = request.body;
    if (!user || !pwd) return response.status(400).json({ 'message': 'Username and password are required.' });

        pool.query(queries.getEmployeeByUserName, [user], (error, results) => {
            if (error) {
                response.status(401).json({ "message": `user : ${user} not found` });
            }
            if(!results?.rows.length){
                response.status(401).json({ "message": `user : ${user} not found length` });
            }else {
                
                // evaluate password 
                const foundUser = results.rows[0]
                console.log('results.rows',results.rows); 
                bcrypt.compare(pwd, foundUser.hashed_password).then((match) => {
                    console.log("match",match);
                    if (match) {
                        // create JWTs
                        const accessToken = jwt.sign(
                            { "username": foundUser.email },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '30s' }
                        );
                        const refreshToken = jwt.sign(
                            { "username": foundUser.email },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: '1d' }
                        );
                    pool.query(
                        queries.updateUserToken,
                        [refreshToken, foundUser.email],
                        (error, results) => {
                            if (error) {
                                console.log('email error: ', error);
                                response.sendStatus(401);
                            }else{

                                console.log('login successful');
                                response.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                                response.json(
                                    {
                                        'email' : foundUser.email,
                                        'accessToken' : accessToken,
                                        'user_id' : foundUser.user_id,
                                        'user_name' : foundUser.user_name,
                                        'isActive' : foundUser.isAdmin
                                    }
                                )
                            }
                        }
                        )
                    // Saving refreshToken with current user
                    // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
                    // const currentUser = { ...foundUser, refreshToken };
                    // usersDB.setUsers([...otherUsers, currentUser]);
                    // await fsPromises.writeFile(
                    //     path.join(__dirname, '..', 'model', 'users.json'),
                    //     JSON.stringify(usersDB.users)
                    // );
                    // response.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                    // response.json({ accessToken });
                } else {
                    response.sendStatus(401);
                }
                console.log('handleLogin success');
                }).catch((error) => {
                    console.log("error",error);
                  });
                
            }    
        })


    // const foundUser = usersDB.users.find(person => person.username === user);
    // if (!foundUser) return response.sendStatus(401); //Unauthorized 
    // // evaluate password 
    // const match = await bcrypt.compare(pwd, foundUser.password);
    // if (match) {
    //     // create JWTs
    //     const accessToken = jwt.sign(
    //         { "username": foundUser.username },
    //         process.env.ACCESS_TOKEN_SECRET,
    //         { expiresIn: '30s' }
    //     );
    //     const refreshToken = jwt.sign(
    //         { "username": foundUser.username },
    //         process.env.REFRESH_TOKEN_SECRET,
    //         { expiresIn: '1d' }
    //     );
    //     // Saving refreshToken with current user
    //     const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
    //     const currentUser = { ...foundUser, refreshToken };
    //     usersDB.setUsers([...otherUsers, currentUser]);
    //     await fsPromises.writeFile(
    //         path.join(__dirname, '..', 'model', 'users.json'),
    //         JSON.stringify(usersDB.users)
    //     );
    //     response.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    //     response.json({ accessToken });
    // } else {
    //     response.sendStatus(401);
    // }
}

module.exports = { handleLogin };