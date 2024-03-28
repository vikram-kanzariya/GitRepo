
// function salt(len , arr){
//     let ans = '';

//     for(let i=len ; i > 0 ; i--){
//         ans += arr[(Math.floor(Math.random() * arr.length))];
//     }
//     console.log(ans);
//     // console.log(arr.length)
// }

// salt(4 , "abcdefghijklmnopqrstuvwxyz0123456789");


// ---> Correct Method <---
// console.log((Math.random().toString(36).slice(2 , 6)))


// const bcrypt = require('bcrypt')


// function hashPassword(plaintextPassword) {
//     bcrypt.hash(plaintextPassword, 10)
//         .then(hash => {
//             // Store hash in the database
//             // return hash;
//             console.log(hash)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

// console.log(hashPassword("vikram"))

// console.log(Date.now());
// console.log(Date.UTC());
// console.log(process.env.TZ);
let dt = new Date();

// console.log(process.env.tz);
// process.env.TZ = "America/Montreal";
// process.env.TZ = "America/Chicago";
// process.env.TZ = "America/Panama";
process.env.TZ = "America/Blanc-Sablon";

console.log(dt.toLocaleTimeString());
// console.log(process.env.tz);