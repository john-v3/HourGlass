const router = require('express').Router();

// Content is the link to the content collection
let Content = require('../models/user.model.js');
let bson = require('bson');
let mongoose = require('mongoose');
const User = require('../models/user.model.js');


router.route('/').get((req, res) => {
    Content.find()
    .then(things => res.json(things))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get user by id
router.route('/:user').get((req, res) => {
    Content.find({_id: new mongoose.Types.ObjectId(req.params.user)})
    .then(thing => res.json(thing))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get user by username
router.route('/:username').get((req, res) => {
    Content.find({username: req.params.username})
    .then(thing => res.json(thing))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get user by email
router.route('/:email').get((req, res) => {
    Content.find({username: req.params.email})
    .then(thing => res.json(thing))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/new').post((req, res) => {
    const username1 = req.body.username;
    const password1 = req.body.password;
    const email1 = req.body.email;
    const dateCreated1 = new Date();
    const bio1 = req.body.bio;

    const newUser = new User({
        username: username1,
        password: password1,
        email: email1,
        dateCreated: dateCreated1,
        bio: bio1
    })

    newUser.save()
    .then(() => res.json({msg: "Added a user"}))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:user').post((req, res) => {
    User.deleteOne({_id: req.params.user})
    .then(() => res.json({msg: `Deleted user ${req.params.user}`}))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateBio').post((req, res) => {
    const user = new mongoose.Types.ObjectId(req.body.user);
    const text = req.body.text;

    User.findOneAndUpdate({_id: user}, {bio: text})
    .then(()=> res.json({msg: "updated bio"}))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;