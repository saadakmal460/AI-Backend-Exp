const express = require('express');
const {signin, signup } = require('../Controller/Auth');
const {addDetection} = require('../Controller/Detecions')

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/detection" , addDetection)

module.exports = router