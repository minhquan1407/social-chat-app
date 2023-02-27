const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendMailService");
const config = require("../config/config")
const auth = require("../middleware/authJwt")

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // const activation_token = createActivationToken(newUser)s
    // const url = `${config.URL_CLIENT}/user/activate/${activation_token}`
    // sendEmail(newUser.email, url, "Verify email your address");

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);  
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email});
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(password, user.password)
    !validPassword && res.status(400).json("wrong password")

    const token = jwt.sign({ _id: user.id }, process.env.SECRET , {
      expiresIn: 86400, // 24 hours
    }); 

    res.status(200).json({user, _id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,})
    // res.status(200).json(user)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.session = null;
    return res.status(200).json({
      message: "You've been signed out!",
    });
  } catch (error) {
    return res.status(500).json({msg: error.message})
  }
})


router.post("/forgot", async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg: "This email does not exist."})

    const access_token = createAccessToken({_id: user.id});
    const url = `${config.CLIENT_URL}/user/reset/${access_token}`

    sendEmail(email, url, "Reset your password")
    res.json({msg: "Re-send the password, please check your email."})
  } catch (error) {
    return res.status(500).json({msg: error.message})
  }
})

router.post("/reset", auth, async (req, res) => {
  try {
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    await User.findOneAndUpdate({_id: req.user._id}, {
      password: passwordHash
    })
    res.status(200).json({msg: "Password successfully changed!"})
  } catch (error) {
    return res.status(500).json({msg: error.message})
  }
})


// function validateEmail(email) {
//   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }

// const createActivationToken = (payload) => {
//   return jwt.sign(payload.toJSON(), process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
// }
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

// const createRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
// }

module.exports = router;
