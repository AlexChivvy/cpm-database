const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const {Picture} = require('../models/professor');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

/* GET home page. */
router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Express - Generated with IronGenerator' });
});

router.post('/upload', uploadCloud.single('path'), (req, res, next) => {
  const name = req.file.name;
  const path = req.file.path;
  const newPhoto = new Picture({name, path})
  newPhoto.save()
  .then(photoFILLERNOTUSED => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;
