const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const connection = require('./connection');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');


const app = express();

app.use("/public" , express.static(path.join(__dirname , '/public')));

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieparser());

app.set("view engine" , "ejs");
app.set("views" , "./views");


function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const authUser = (req , res, next) => {
    let token = req.cookies.token || req.body.token ;

    if(!token){
        return res.redirect('/login');
    }
    else{
        let decoded = jwt.verify(token , "abcdef" , { expiresIn : '1h' });
        req.user = decoded;
        
        next();
    }
}



// app.get("/" , (req , res) => {
//     res.send("Home Page...");
// });

// app.get("/register" , (req , res) => {
//     res.render('register');
// });

// app.get("/login" , (req , res) => {
//     res.render("login");
// });

// app.get("/forgot" , async(req , res) => {
//    res.render('forgot');   
// });

// app.get("/reset" , async(req , res) => {
//    res.render('createpassword');   
// });




// ---> Display User Details After Login <---
// app.get("/details" , authUser , async(req ,res) => {
//     return res.render('details' , { user:req.user });

//     // let email = req.query.email;
//     // let id = req.query.id;
//     // let sql = "select * from register_user where uid = ? ";

//     // let [result] = await connection.query(sql , [id] );

//     // return res.render('details' , { user:result });
// });


// app.get("/logout" , (req , res) => {
//     res.clearCookie('token').json({
//         success:true
//     })
// })


// // ---> Generate Link to reset Password <---
// app.post("/forgot" , async(req , res) => {
//     let email = req.body.email.trim();
    
//     if(!email){
//         return res.json({
//             success:false,
//             message:"Email is Required..."
//         });
//     }

//     let sql = "select * from register_user where email = ?";
//     let [result] = await connection.query(sql , [email]);
    
//     if(result.length <= 0){
//         return res.json({
//             success:false,
//             message:"User Not Found...",
//         });
//     }

//     return res.json({
//         success:true,
//         mail:email
//     });

//     // console.log(result[0].email);
// });


// // ---> Reset/Update the Password(Forgot Password) <---
// app.post("/reset" , async(req , res) => {
//     let passwd = req.body.passwd;
//     let cpasswd = req.body.cpasswd;
//     let email = req.body.email;

//     // console.log(email);
//     // console.log(passwd);
//     // console.log(cpasswd);

//     if(!passwd || !cpasswd){
//         return res.json({
//             success:false,
//             message:"All Fields are Required..."
//         });
//     }

//     if(passwd != cpasswd){
//         return res.json({
//             success:false,
//             message:"Password Doesn't Match"
//         });
//     }

//     // ---> Generating New Salt
//     let salt = Math.random().toString(36).slice(2 , 6);
//     passwd = passwd + salt;

//     let bcryptSalt =  bcrypt.genSaltSync(10);
//     let hashPassword = await bcrypt.hash(passwd , bcryptSalt);

//     let sql = "update register_user set password = ? , pw_salt = ? where email = ?";

//     let [result] = await connection.query(sql , [hashPassword , salt , email]);
//     // console.log(result.length)

//     if(!result.affectedRows){
//         return res.json({
//             success:false,
//             message:"Error Occured During Password Reset",
//         });
//     }

//     return res.json({
//         success:true,
//         message:"Password Updated Successfully...",
//     });

//     // let  html = `
//     //     <div class="verify-token"> 
//     //         <p style="background-color:green">Password Updated Successfully</P>
//     //     </div>
//     //     `;
//     // return res.render('activateForm' , { html });
// });

// // ---> Login User <---
// app.post("/login" , async(req , res) => {
//     let email = req.body.email.trim();
//     let passwd = req.body.passwd;

//     if(!email || !passwd){
//         // console.log("All Fields Are Required...");
//         return res.json({
//             success:false,
//             message:"All Fields are Reuired..."
//         });
//     }

//     if(email && (!isValidEmail(email))){
//         return res.json({
//             success:false,
//             message:"Please Enter Correct Credentials..."
//         });
//     }

//     let sql = "select * from register_user where email = ?";
//     // console.log(sql)
//     let [result] = await connection.query(sql , [email]);
//     // console.log(result)

//     // ---> Check if User Registered or Not <---
//     if(result.length <= 0){
//         // console.log("User does not exist or Invalid Credentials...")
//         return res.json({
//             success:false,
//             message:"User does not exist or Invalid Credentials..."
//         });
//     }

//     // console.log(passwd);
//     // console.log(result[0].password);

//     let userPassword = result[0].password; // ---> Registered Password.
//     let EnteredPassword = passwd + result[0].pw_salt; // ---> User Entered Password.

//     let id = result[0].uid;

//     let payload = {
//         uid:result[0].uid,
//         fname:result[0].fname,
//         lname:result[0].lname,
//         email:result[0].email,
//     };

//     let token = jwt.sign(payload , "abcdef");

//     let {password:_ , ...newObj } = result[0];
//     // console.log(newObj)
//     newObj.token = token;

//     if(await bcrypt.compare(EnteredPassword , userPassword)){
//         console.log('Login Success')
//         return res.cookie('token' , token).json({
//             success:true,
//             message:"Login success",
//             uid:id,
//             token:newObj,
//         })
//     }
//     else{
//         console.log("Login failed")
//         return res.json({
//             success:false,
//             message:"login failed",
//         })
//     }
// });

// // ---> Create New User <---
// app.post("/register" , async(req ,res) => {
//     // ---> Register/Create User <---
//     let fname = req.body.fname;
//     let lname = req.body.lname;
//     let email = req.body.email;
//     let passwd = req.body.passwd;
//     let cpasswd = req.body.cpasswd;

//     if(!fname || !lname || !email || !passwd || !cpasswd ){
//         console.log("All Fields are Required...")
//         return res.json({ 
//             success:false,
//             message:  "Please Enter All Details Properly..." });
//     };

//     if(email && !isValidEmail(email)){
//         console.log("Invalid Email...")
//         return res.json({
//             success:false,
//             message:'Email is Not Valid'
//         })
//     }

//     if( cpasswd !== passwd ){
//         console.log("Invalid Credentials...");
//         return res.json({
//             success:false,
//             message:'Password is Not Valid...'
//         })
//     }

//     let sql = "select * from register_user where email = ?";
//     let [result] = await connection.query(sql , [email]);

//     if(result.length > 0){
//         console.log('Invalid Credentials...')
//         return res.json({
//             success:false,
//             message:"User Already Exists..."
//         })
//     }

//     // let salt = await generateSalt(4 , 'abcdefghijklmnopqrstuvwxyz0123456789');
//     let salt = Math.random().toString(36).slice(2 , 6);

//     passwd = passwd + salt;

//     //Generate the Hashes
//     let bcryptSalt =  bcrypt.genSaltSync(10);

//     // Mix Password with Hash
//     let hashPassword = await bcrypt.hash(passwd , bcryptSalt);
  
//     let verification_token = crypto.randomUUID();




//     // ---> Generating JWT Token <---
//     // let details = { email , passwd };

//     // let secret = 'abcdef';
//     // const token = jwt.sign(details , secret , { expiresIn: '1h' });

    
    
//     sql = `insert into register_user(fname , lname , email , password , pw_salt , verification_token) values (?)`;

//     let data = [ fname , lname , email , hashPassword , salt , verification_token];  
//     [result] = await connection.query(sql , [data]);

//     if(!result.affectedRows){
//         return res.json({
//             success:false,
//             message:"Error Occured During Registration",
//         })
//     }

//     // sql = "select * from register_user where email = ?";
//     // [result] = await connection.query(sql , [email]);
//     // result[0].verification_token = verification_token;

//     return res.json({
//         success:true,
//         message:"Registered Successfully...",
//         activeToken:verification_token,
//         email:email,
//         token:token
//     });
// });

// // ---> Activate the User <---
// app.get("/token" , async(req , res) => {

//     let token = req.query.token;
//     let email = req.query.email;

//     if(!token || !email){
//         return res.json({ message:"Some Error Occured..." });
//     }

//     let html = `
//         <div class="activeUser">
//             <h5> Thanks For Registration</h5>

//             <p>Click on this Link to Activate Your Account</p>

//             <a href="http://localhost:8000/verify/?token=${token}&email=${email}">http://localhost:8000/verify/?token=${token}&email=${email} </a>
//         </div>
//     `;

//     return res.render('activateForm' , { html });
// });

// // ---> Update the Status of Token <---
// app.get("/verify" , async(req , res) => {
//     let token = req.query.token;
//     let email = req.query.email;

//     // let id = req.params.uid;
//     // console.log(id);


//     // ---> Check if Token Exists or Not
//     let sql = "select * from register_user where verification_token = ? and email = ?";

//     let [result] = await connection.query(sql , [token , email]);
//     // console.log(result[0].uid)

//     if(result.length <= 0){
//         let  html = `
//             <div class="verify-token"> 
//                 <p style="background-color:red">Token is Invalid...</P>
//             </div>
//         `;
//         return res.render('activateForm' , { html });
//     }

//     let diff = new Date(Date.now()) - new Date(result[0].created_at);
//     let minutes = Math.floor((diff % 86400000 ) / 60000 );

//     // console.log(minutes)

//     if(minutes > 1 && result[0].activated == false){

//         // console.log(result[0].activated );

//         [result] = await connection.query(`delete from register_user where verification_token = "${token}" `);

//         let  html = `
//                 <div class="verify-token"> 
//                     <p style="background-color:red">Token is Expired...</P>
//                 </div>
//             `;
//         return res.render('activateForm' , {html})
//     }


//     // ---> Update Activeated Status to true <---
//     [result] = await connection.query(`update register_user set activated = 1 where verification_token = "${token}" `);

//     let  html = `
//     <div class="verify-token"> 
//         <p style="background-color:green">Your Account is Activated Successfully</P>
//         <a href="http://localhost:8000/login">Click here</a> to Login
//     </div>
// `;

//     return res.render('activateForm' , {html})
// }); 


app.listen(8000 , () => {
    console.log("Listening on Port: 8000");
});















// app.get("/details/:id" , async(req ,res) => {
//     // let email = req.query.email;
//     let id = req.params.id;
//     let sql = "select * from register_user where uid = ?";

//     let [result] = await connection.query(sql , [id]);

//     return res.render('details' , { user:result });
// });