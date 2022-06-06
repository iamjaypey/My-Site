const express = require("express");

const app = express();

const port = 7000;
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const { response } = require("express");
const User = require ('./models/User.js');
const bcrypt = require('bcryptjs')


// DB connection
mongoose.connect("mongodb://localhost/MyDatabase")
.then(response => console.log('Database connection successful'))
.catch(error => console.log(`Database connection error: ${error}`))



// morgan setup
app.use(logger('dev'));

// Setup of view Engine to use Ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views', )))

// Static files directory setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//  


// creation of route for home
app.get('/', (req,res) => {

    const allPosts = [
        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Second Post',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'third post',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },

        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
            title: 'Card title',
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
    ];

    res.render('home', {allPosts});
});

// creation of login route
app.get('/login', (req,res) => {
    res.render('login');
})

// creation of route for new-post
app.get('/new-post', (req,res) => {
    res.render('newPost');
})
// creation of route for newregister
app.get('/User/register', async (req,res) => {
    let {userName, password,confirmpassword,email,summary,image} = req.body;
    if(password.length <6) {
        console.log("password must be greater than six")
    } 
    else if (password != confirmpassword){
        console.log("Password not the same")
    }
//     else {
//     console.log(req.body) 
// }

let userExist = await User.findOne({email})
if(userExist){
    console.log('User already exists')
}
else {
const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password, salt);

let newUser= new User({
    userName,
    password: hashedpassword,
    email,
    summary,
    image

})

newUser = await newUser.save();
if (!newUser){
    console.log('something went wrong')
}
else {
    console.log(`Registration successful ${newUser}`)
}
}

})

// creation of route for register
app.get('/register', (req,res) => {
    res.render('register');
})

// creation of route for viewpost
app.get('/viewpost1', (req,res) => {
    res.render('viewpost1');
})


app.listen(port, () => console.log(`server running on ${port}`));
