const connection = require("../../connection");
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');
const crypto = require('crypto');

const dotenv = require('dotenv');
require('dotenv').config();


function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

exports.authUser = (req , res, next) => {

    let token = req.cookies?.token || req.body?.token ;


    if(!token){
        return res.redirect('/login');
    }
    else{
        let decoded = jwt.verify(token , process.env.JWT_SECRET , { expiresIn : '1h' });
        req.user = decoded;
        
        next();
    }
}

exports.getRegisterForm = (req , res) => {
    res.render('registration/register');
};

exports.getLoginForm = (req , res) => {
    res.render("registration/login");
};

exports.forgotForm = async(req , res) => {
   res.render('registration/forgot');   
};

exports.resetPasswordForm = async(req , res) => {
   res.render('registration/createpassword');   
};


// ---> Display User Details After Login <---
exports.userDetails = (async(req , res) => {
    return res.render('registration/details' , { user:req.user });
});


exports.logout = (req , res) => {
    res.clearCookie('token').json({
        success:true,
        message:"Logout Successfull"
    })
};


// ---> Generate Link to reset Password <---
exports.forgotLink = async(req , res) => {
  try {
    let email = req.body.email.trim();
    
    if(!email){
        return res.json({
            success:false,
            message:"Email is Required..."
        });
    }

    let sql = "select * from register_user where email = ?";
    let [result] = await connection.query(sql , [email]);
    
    if(result.length <= 0){
        return res.json({
            success:false,
            message:"User Not Found...",
        });
    }

    return res.json({
        success:true,
        mail:email
    });
  } 
  catch (error) {
    console.log(new Error(error))
  }

};

// ---> Reset/Update the Password(Forgot Password) <---
exports.upatePassword = async(req , res) => {
  try {
    let passwd = req.body.passwd;
    let cpasswd = req.body.cpasswd;
    let email = req.body.email;

    if(!passwd || !cpasswd){
        return res.json({
            success:false,
            message:"All Fields are Required..."
        });
    }

    if(passwd != cpasswd){
        return res.json({
            success:false,
            message:"Password Doesn't Match"
        });
    }

    // ---> Generating New Salt
    let salt = Math.random().toString(36).slice(2 , 6);
    passwd = passwd + salt;

    let bcryptSalt =  bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash(passwd , bcryptSalt);

    let sql = "update register_user set password = ? , pw_salt = ? where email = ?";

    let [result] = await connection.query(sql , [hashPassword , salt , email]);

    if(!result.affectedRows){
        return res.json({
            success:false,
            message:"Error Occured During Password Reset",
        });
    }

    return res.json({
        success:true,
        message:"Password Updated Successfully...",
    });
  } catch (error) {
    console.log(new Error(error));
  }
};

// ---> Login User <---
exports.LoginUser = async(req , res) => {
    try {
        let email = req.body.email.trim();
    let passwd = req.body.passwd;

    if(!email || !passwd){
        return res.json({
            success:false,
            message:"All Fields are Reuired..."
        });
    }

    if(email && (!isValidEmail(email))){
        return res.json({
            success:false,
            message:"Please Enter Correct Credentials..."
        });
    }

    let sql = "select * from register_user where email = ?";
    let [result] = await connection.query(sql , [email]);

    // ---> Check if User Registered or Not <---
    if(result.length <= 0){
        return res.json({
            success:false,
            message:"User does not exist or Invalid Credentials..."
        });
    }

    let userPassword = result[0].password; // ---> Registered Password.
    let EnteredPassword = passwd + result[0].pw_salt; // ---> User Entered Password.

    let id = result[0].uid;

    let payload = {
        uid:result[0].uid,
        fname:result[0].fname,
        lname:result[0].lname,
        email:result[0].email,
    };

    let token = jwt.sign(payload , process.env.JWT_SECRET);

    let {password:_ , ...newObj } = result[0];
    newObj.token = token;

    if(await bcrypt.compare(EnteredPassword , userPassword)){
        console.log('Login Success')
        // , { maxAge: 3600 , httpOnly:true}
        return res.cookie('token' , token ).json({
            success:true,
            message:"Login success",
            uid:id,
            token:newObj,
        })
    }
    else{
        console.log("Login failed")
        return res.json({
            success:false,
            message:"login failed",
        })
    }
    } catch (error) {
        console.log(new Error(error))
    }
};

// ---> Create New User <---
exports.RegisterUser = async(req ,res) => {
   try {
     // ---> Register/Create User <---
     let fname = req.body.fname;
     let lname = req.body.lname;
     let email = req.body.email;
     let passwd = req.body.passwd;
     let cpasswd = req.body.cpasswd;
 
     if(!fname || !lname || !email || !passwd || !cpasswd ){
         console.log("All Fields are Required...")
         return res.json({ 
             success:false,
             message:  "Please Enter All Details Properly..." });
     };
 
     if(email && !isValidEmail(email)){
         console.log("Invalid Email...")
         return res.json({
             success:false,
             message:'Email is Not Valid'
         })
     }
 
     if( cpasswd !== passwd ){
         console.log("Invalid Credentials...");
         return res.json({
             success:false,
             message:'Password is Not Valid...'
         })
     }
 
     let sql = "select * from register_user where email = ?";
     let [result] = await connection.query(sql , [email]);
 
     if(result.length > 0){
         console.log('Invalid Credentials...')
         return res.json({
             success:false,
             message:"User Already Exists..."
         })
     }
 
     let salt = Math.random().toString(36).slice(2 , 6);
 
     passwd = passwd + salt;
 
     //Generate the Hashes
     let bcryptSalt =  bcrypt.genSaltSync(10);
 
     // Mix Password with Hash
     let hashPassword = await bcrypt.hash(passwd , bcryptSalt);
   
     let verification_token = crypto.randomUUID();
 
     
     
     sql = `insert into register_user(fname , lname , email , password , pw_salt , verification_token) values (?)`;
 
     let data = [ fname , lname , email , hashPassword , salt , verification_token];  
     [result] = await connection.query(sql , [data]);
 
     if(!result.affectedRows){
         return res.json({
             success:false,
             message:"Error Occured During Registration",
         })
     }
 
     return res.json({
         success:true,
         message:"Registered Successfully...",
         activeToken:verification_token,
         email:email,
         // token:token
     });
   } catch (error) {
        console.log(new Error(error))
   }
};

// ---> Activate the User <---
exports.activateUser = async(req , res) => {
    try {
        
    let token = req.query.token;
    let email = req.query.email;

    if(!token || !email){
        return res.json({ message:"Some Error Occured..." });
    }

    let html = `
        <div class="activeUser">
            <h5> Thanks For Registration</h5>

            <p>Click on this Link to Activate Your Account</p>

            <a href="http://localhost:4000/verify/?token=${token}&email=${email}">http://localhost:4000/verify/?token=${token}&email=${email} </a>
        </div>
    `;

    return res.render('registration/activateForm' , { html });
    } catch (error) {
        console.log(new Error(error))
    }
};

// ---> Update the Status of Token <---
exports.verifyUser =  async(req , res) => {
  try {
    let token = req.query.token;
    let email = req.query.email;

    // ---> Check if Token Exists or Not
    let sql = "select * from register_user where verification_token = ? and email = ?";

    let [result] = await connection.query(sql , [token , email]);

    if(result.length <= 0){
        let  html = `
            <div class="verify-token"> 
                <p style="background-color:red">Token is Invalid...</P>
            </div>
        `;
        return res.render('registration/activateForm' , { html });
    }

    let diff = new Date(Date.now()) - new Date(result[0].created_at);
    let minutes = Math.floor((diff % 86400000 ) / 60000 );


    if(minutes > 1 && result[0].activated == false){

        [result] = await connection.query(`delete from register_user where verification_token = "${token}" `);

        let  html = `
                <div class="verify-token"> 
                    <p style="background-color:red">Token is Expired...</P>
                </div>
            `;
        return res.render('activateForm' , {html})
    }


    // ---> Update Activeated Status to true <---
    [result] = await connection.query(`update register_user set activated = 1 where verification_token = "${token}" `);

    let  html = `
    <div class="verify-token"> 
        <p style="background-color:green">Your Account is Activated Successfully</P>
        <a href="http://localhost:4000/login">Click here</a> to Login
    </div>
`;

    return res.render('registration/activateForm' , {html})
  } catch (error) {
    console.log(new Error(error));
  }
}; 