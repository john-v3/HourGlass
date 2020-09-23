const router = require('express').Router();
const mongoose = require('mongoose');

// Content is the link to the content collection
let Content = require('../models/content.model.js');


// get everything
router.route('/getAll').get((req, res) => {
    Content.find()
    .then(things => res.json(things))
    .catch(err => res.status(400).json('Error: ' + err));
});

//getone
router.route('/').get((req, res) => {
    Content.find({_id: req.query.id})
    .then(things => res.json(things))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Post content body
router.route('/add').post((req, res) => {
    const title1 = req.body.title;
    const author1 = new mongoose.Types.ObjectId();
    const privacyLevel1 = req.body.privacyLevel;
    const timePosted1 = new Date();
    var link1 = "";
    var text1 = "";
    var file1 = "";

    if (req.body.link != null)
        var link1 = req.body.link;

    if (req.body.text != null)
        var text1 = req.body.text;

    if (req.body.file != null)
        var file1 = req.body.file;

    const newContent = new Content({
        title: title1,
        author: author1,
        privacyLevel: privacyLevel1,
        timePosted: timePosted1,
        link: link1,
        text: text1,
        file: file1
    });

    newContent.save()
    .then(() => res.json({msg: "all good"}))
    .catch(err => res.status(400).json('Error: ' + err));

});


// Delete content
router.route('/delete').delete((req, res) => {
    const title1 = req.body.id;
    Content.deleteOne({id: title1}, (title, err)=> {
        if (err)
            res.send(err);
        else
            res.send('Deleted post: ' + title);
    });
})

// Update/edit content
router.route('/update').put((req, res) => {
    const target = req.body.title;
    Content.findOneAndUpdate({
        title: target},
        {
            $set: {
                title: newTitle
            }
        }
    )
})

// Get everything you can see


// Filter information

module.exports = router;