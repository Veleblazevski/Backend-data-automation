import database from '../db/database';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const { con } = database;

const createSingleStudent = `INSERT INTO students (firstName,lastName,email) VALUES (?,?,?)`;

//SELECT s.* FROM instructors AS i,course AS c,course_student AS cs,students AS s WHERE i.idInst = c.instructorId AND c.idCourse = cs.courseId AND cs.studentId = s.idStudent;
//SELECT i.*,s.* FROM instructors AS i,course AS c,course_student AS cs,students AS s WHERE i.idInst = c.instructorId AND c.idCourse = cs.courseId AND cs.studentId = s.idStudent;


function createStudent(firstName, lastName, email) {
    return new Promise((resolve, reject) => {
        con.query(createSingleStudent, [firstName, lastName, email], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function create(req, res, next) {
    const {
        firstName,
        lastName,
        email
    }: {
        firstName: ? string,
        lastName: ? string,
        email: ? string
    } = req.body;
    const department = await createStudent(firstName, lastName, email);
    res.status(201).send("MESSAGE");
    await next;
};













































































// const { insertPost, getSinglePostById, getPostsList, updatepost, deletePost, innerJoin } = queries;

// Bluebird.promisifyAll(jwt);
// Bluebird.promisifyAll(bcrypt);

// function checkPhone(number: string) {
//     const checkIfNumPlus = parseInt(number.substring(1, number.length - 1));
//     if (number.charAt(0) === '+' && isNumber(checkIfNumPlus)) {
//         return true;
//     }
//     if (number.includes("()")) {
//         return true;
//     }
//     if (number.substring(0, 1) === '-') {
//         return true;
//     } else {
//         return false;
//     }

// }


// const listUserPosts = async(req, res, next) => {
//     const { userId }: { userId: string } = req.params;
//     console.log("This is the query" + innerJoin)
//     return con.query(innerJoin, [Number(userId)], (err, results) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(results)
//             res.status(200).send(results);
//         }
//     })
//     await next;
// }




// const get = async(req, res, next) => {
//     const { id }: { id: string } = req.params;
//     const querySelect = `SELECT * FROM users WHERE id = ?`;
//     return con.query(querySelect, [Number(id)], (err, results, fields) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.status(200).send(results);
//         }
//     });
//     await next;
// }


// const list = async(req, res, next) => {
//     const listingUsers = 'SELECT * FROM users'
//     return con.query(listingUsers, (err, results, fields) => {
//         if (err) {
//             throw err;
//         }
//         res.status(200).send(results);
//     });
//     await next;
// }


// async function create(req, res, next) {
//     const {
//         firstName,
//         lastName,
//         username,
//         email,
//         password,
//         phoneNumber
//     }: {
//         firstName: ? string,
//         lastName: ? string,
//         username: string,
//         email: string,
//         password: string,
//         phoneNumber: ? string
//     } = req.body;
//     const checkNum = checkPhone(phoneNumber);
//     if (!checkNum) {
//         return res.status(403).send("Wrong num");

//     }


//     const salt = bcrypt.genSaltSync(10);
//     const getRounds = bcrypt.getRounds(salt);
//     const passHash = bcrypt.hashSync(password, getRounds);

//     const idQuery = `SELECT * FROM users`;
//     const createAt = new Date(Date.now());
//     return con.query(idQuery, (err, results) => {
//         const addQuery = `INSERT INTO users (firstName,lastName,username,email,password,salt,phoneNumber,created_at) VALUES (?,?,?,?,?,?,?,?)`;
//         return con.query(addQuery, [firstName, lastName, username, email, passHash, salt, phoneNumber, createAt], (err, results) => {
//             if (err) {
//                 console.error("this is the ERROR", err);
//             } else {
//                 res.status(201).send({ data: { firstName, lastName, username, email, phoneNumber } });
//             }
//         });
//     });
//     await next;
// }


// const del = async(req, res, next) => {
//     const { id }: { id: string } = req.params;
//     const querySelect = `DELETE FROM users WHERE id = ?`;
//     return con.query(querySelect, Number(id), (err, results, fields) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.status(202).send(results);
//         }
//     });
//     await next;
// }



// const update = async(req, res, next) => {
//     const { id }: { id: string } = req.params;
//     const {
//         firstName,
//         lastName,
//         username,
//         email
//     }: {
//         firstName: ? string,
//         lastName: ? string,
//         username: ? string,
//         email: ? string
//     } = Object.assign({}, req.body);
//     const userId = req.body.id;
//     if (userId) {
//         res.status(403).send(`${id} should be overwritten`);
//     } else {
//         const querySelect = `SELECT * FROM users WHERE id = ?`;
//         return con.query(querySelect, [Number(id)], (err, results) => {
//             if (err) {
//                 console.log(err);
//             }
//             let fN = firstName;
//             let lN = lastName;
//             let uN = username;
//             let eM = email;
//             if (!firstName) {
//                 fN = results[0].firstName
//             }
//             if (!lastName) {
//                 lN = results[0].lastName
//             }
//             if (!username) {
//                 uN = results[0].username
//             }
//             if (!email) {
//                 eM = results[0].email
//             }

//             if (password && password.length) {
//                 const salt = bcrypt.genSaltSync(10);
//                 const getRounds = bcrypt.getRounds(salt);
//                 const passHash = bcrypt.hashSync(password, getRounds);
//                 const updateQuery = 'UPDATE users SET firstName = ?,lastName = ?,username = ?,email = ?,password = ? WHERE id = ?';
//                 return con.query(updateQuery, [fN, lN, uN, eM, passHash, Number(id)], (err, results) => {
//                     if (err) {
//                         console.log("this is the ERROR", err);
//                     } else {
//                         res.status(204).send(results);
//                     }
//                 });
//             } else {
//                 res.status(403).send("The password is required");
//             }

//         });
//     }
//     await next;
// }



// const login = async(req, res, next) => {
//     const { email, password }: { email: string, password: string } = req.body;
//     const userWithEmail = 'SELECT * FROM users WHERE email = ?';
//     return con.query(userWithEmail, email, (err, results) => {
//         if (err) {
//             console.error(err);
//         }
//         const user = results.find(e => e.email === email);
//         if (results && results.length && user.email) {
//             const checkPassword = bcrypt.compareSync(password, user.password);
//             console.log('check', checkPassword);
//             if (checkPassword) {
//                 delete user.password;
//                 delete user.salt;

//                 const userId = user.id
//                 const token = jwt.sign({ user }, 'aaaa', { expiresIn: '1h' });

//                 res.status(200).send({
//                     message: 'Logged in',
//                     body: token
//                 });
//             }
//         } else {
//             res.status(403).send('Password Incorect');

//         }
//     });
//     res.status(200);
//     await next;
// }


export default {
    create
}