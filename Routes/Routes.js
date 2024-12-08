const express = require('express');
const {signin, signup, GetAllUsers, DeleteUserById, EditUserById } = require('../Controller/Auth');
const {addDetection, confirmDetection, getPendingDetections, resolveDetection, markAsSent, markAsUnconfirmed} = require('../Controller/Detecions')

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get('/getAllUsers' , GetAllUsers)
router.delete('/delete' , DeleteUserById)
router.patch('/update' , EditUserById)


router.post("/detection" , addDetection)
router.put("/confirm/:id" , confirmDetection)
router.get("/pending", getPendingDetections)
router.put("/resolve/:id", resolveDetection)
router.put("/sent/:id", markAsSent)
router.put("/unconfirmed/:id", markAsUnconfirmed)

module.exports = router