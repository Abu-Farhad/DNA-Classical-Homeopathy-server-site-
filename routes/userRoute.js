import express from 'express'
import { getProfile, loginUser, registerUser, updatePfofile,bookAppointment,listAppointments,cancelAppointment,checkSlotAvailability } from '../controllers/userController.js'
import authUser from '../middlewires/authUser.js'
// import multer from 'multer'
import upload from '../middlewires/multer.js'
// import { list } from 'postcss'

const userRouter =express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single("image"),authUser,updatePfofile)
userRouter.post('/check-slot-availability',authUser,checkSlotAvailability)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

export default userRouter