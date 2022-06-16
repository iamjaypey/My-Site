const express = require("express");

const app = express();

const port = process.env.PORT || 7000;
const logger = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const { response } = require("express");
const User = require ('./models/User.js');
const post = require('./models/Post.js');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {globalVariables} = require('./config/globalConfig');
const passport = require('passport');
const localstrategy = require('passport-local');
const {isLoggedIn} = require('./config/authorization');
const multer  = require('multer');
const cloudinary = require('cloudinary').v2;
const moment = require('moment');


const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
     
    }
})
const upload = multer({storage: storage});

// setup cloudinary
cloudinary.config({
    cloud_name: 'dvbxorv8m',
    api_key: '959114496447425',
    api_secret: 'i3sv5adt1ZhlOeujjHSSSShPIvE'
});


// DB connection
mongoose.connect("mongodb+srv://iamjaypee:Jesuloluwa1@jaypeeblog.u6xq9cb.mongodb.net/?retryWrites=true&w=majority")
.then(response => console.log('Database connection successful'))
.catch(error => console.log(`Database connection error: ${error}`))


// setup of cookies configuration
app.use(cookieParser());


// session configuration
app.use(session({
    secret: 'hax-3dn qsx9=2odkjnxxq2ej=w',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: Date.now() + 3600000
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://iamjaypee:Jesuloluwa1@jaypeeblog.u6xq9cb.mongodb.net/?retryWrites=true&w=majority',
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
  }));

//   passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy ({usernameField:'email',passReqToCallback: true},
async(req, email, password, done) => {
    await User.findOne ({email})
    .then((user) => {
        if (!user){
            return done(null, false,
                req.flash('error-message', 'user not found.Please Register and try again'))
        }
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if(err) {
                return err;
            }
            if(!passwordMatch)
            return done(null, false, req.flash('error-message', 'Incorrect password'))
            return done(null, user, req.flash('success-message', 'login successful'));
        })
    })
}
))
// password serialization
passport.serializeUser(function (user, done) {
    done(null, user, user.id);
});

// password de-serializer
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});



  app.use(flash());
  app.use(globalVariables)

// morgan setup
app.use(logger('dev'));

// Setup of view Engine to use Ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// moment setup
app.locals.moment = moment;

app.use(express.static(path.join(__dirname, 'views', )))

// Static files directory setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//  


// creation of route for home
app.get('/', async (req,res) => {

    const allPosts = await post.find({}).sort({_id: -1});
    res.render('home', {allPosts});
});

// creation of login route
app.get('/login', (req,res) => {
    res.render('login');
});
app.post('/user/login',passport.authenticate('local',{
    failureRedirect: '/login',
    successRedirect: '/',
    session: true
}));

// creation of route for logout

// creation of route for new-post
app.get('/new-post', (req,res) => {
    res.render('newPost');
})

let newPost = new post();

app.post('/new-post', isLoggedIn, upload.single('mediaFile'), async (req,res) => {
    let {title, content} = req.body;
    let mediaType = '';
    if (req.file.mimetype === 'video/mp4') {
        mediaType = 'video';
    }else{
            mediaType = 'image';
        }

  const uploadedFile = await cloudinary.uploader.upload(req.file.path, { resource_type: mediaType});

  if(!uploadedFile) {
    req.flash('error-message','Error while uploading file!!');

   return res.redirect('back') 
//    now head over to model folder and add mediaType
  }
  let newPost = new post({
    title,
    content,
    mediaType,
    mediaFile: uploadedFile.secure_url,
    author: req.user._id
  });
  await newPost.save();
  
  req.flash('success-message', 'Successfully uploaded')
  res.redirect('back')
});

// creation of route for viewpost1
// creation of route for viewpost
app.get('/viewPost1/:postId', async (req,res) => {
    let singlepost = await post.findOne ({ _id: req.params.postId}).populate("author");
    console.log(singlepost)
    res.render('viewpost1', { singlepost }) ;
});

// creation of route for register
app.get('/register', (req,res) => {
    res.render('register');
});

app.post('/user/register', async (req, res)=> {
    // req.flash("success-message", "The actual error");
    // res.redirect("back");
    let {
        username,
        password,
        email,
        confirmPassword,
        summary,
        image
    } = req.body;

    const userExists = await User.findOne({ email  });


    if (userExists) {
        req.flash("error-message", "The user already exists");
        return res.redirect("back");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)

    const newUser = new User ({
        username,
        email,
        password: hashedPassword,
        summary,
        image
    });

    await newUser.save();

    req.flash("success-message", "Registration successful!")
    return res.redirect ("/")

});


app.get('/user/logout',(req,res) => {
    req.logout(function(err) {
        if (err) return next (err)
    
        req.flash("success-message", "User Successfully logged out")
        res.redirect('/login')
    });
})

// creation of route for profile
app.get('/user/profile', isLoggedIn, (req,res) => {
    res.render('profile');
});


app.listen(port, () => console.log(`server running on ${port}`));
