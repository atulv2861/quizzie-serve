const { getAccessToken, getRefereshToken } = require('../middleware/tokenMiddleware');
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')
const passwordHash =require("password-hash");
const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }

        const userDetails=await User.find({email:email});
        if(userDetails.length){
            return res.status(400).json({
                success: false,
                message: "User already exist!"
            })
        }
        let hashPassword = passwordHash.generate(password);
        const newUser = new User(req.body);
        newUser.isLoggedIn = false;
        newUser.password=hashPassword;
        const user = await newUser.save();

        const accessToken = await getAccessToken(user._id);
        const refreshToken = await getRefereshToken(user._id);
        let ussrr = await User.findOneAndUpdate(
            { _id: user._id.toString() },
            {
                refreshToken: refreshToken,
                isLoggedIn: true,
            },
            { new: true }
        );          
        res.status(201).json({
            success: true,
            user: ussrr,
            accessToken
        });
    } catch (error) {        
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;               
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "All field required!!!!"
            })
        }
        // create a entry in data base
        const user = await User.findOne({ email: email }); 
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password"
            })
        }   
        // validate password
        const passwordMatch = await passwordHash.verify(
            password,
            user.password
          );
          if (!passwordMatch) {
            return response
              .status(401)
              .json({ msg: "Password is incorrect" });
          }
        // generate access and refres token
        const accessToken = await getAccessToken(user._id);
        const refreshToken = await getRefereshToken(user._id);
        let ussrr = await User.findOneAndUpdate(
            { _id: user._id.toString() },
            {
                refreshToken: refreshToken,
                isLoggedIn: true,
            },
            { new: true }
        ); 
        res.status(201).json({
            success: true,
            user: ussrr,
            accessToken
        })
    } catch (error) {       
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
const logoutUser = async (req, res) => {
    try {
        const _id = req.params.userId;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found !!!!"
            })
        }
        user.refreshToken = null;
        user.isLoggedIn=false;
        await user.save()
        res.status(200).json({
            success: true,
            message:"User logout successfully!"
        })
    } catch (error) {     
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getNewAccessToken=async(req,res)=>{
    try{        
        const refreshToken=req.body.refreshToken;
        let accessToken=null;        
        const {_id} = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_KEY);           
        if(_id){
          const user = await User.findById(_id);          
          if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            })
          }
          accessToken = await getAccessToken(user._id);          
          return res.status(200).json({
            success:true,
            message:"Get new access token!",
            accessToken
          });
        }else{
            return res.status(400).json({
                success:false,
                message:"Invalid refresh token!"
            })
         }
    }catch(error){        
        return res.status(400).json({
            success:false,
            message:"Something went wrong!",
          });
    }
}
module.exports = { 
    registerUser,    
    loginUser, 
    logoutUser,
    getNewAccessToken,
 }

