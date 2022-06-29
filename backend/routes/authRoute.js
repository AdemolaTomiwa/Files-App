import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

import User from '../models/userModel.js';

// Check for existing user
// POST @/api/auth/check
// Public
router.post('/check', (req, res) => {
   const { email } = req.body;

   // Check if user entered email

   if (!email) {
      return res.status(400).json({ msg: 'Please enter email!' });
   }

   User.findOne({ email })
      .then((user) => {
         if (!user) {
            res.status(400).json({ msg: 'User does not exist! Sign up!' });
         } else {
            res.status(200).json({ success: true });
         }
      })
      .catch((err) => console.log(err));
});

// Login existing User
// POST @/api/auth
// Public
router.post('/', (req, res) => {
   // Bring out the details
   const { email, password } = req.body;

   // Check if user entered email
   if (!email) {
      return res.status(400).json({ msg: 'Please enter email!' });
   }

   // Check if user does not exist and return
   User.findOne({ email }).then((user) => {
      if (!user) {
         return res.status(400).json({ msg: 'User does not exist! Sign up!' });
      }

      // Validation
      if (!password) {
         res.status(400).json({ msg: 'Please enter password!' });
      } else {
         // Validate  user password
         bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
               if (!isMatch) {
                  return res.status(400).json({ msg: 'Incorrect password!' });
               }

               jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET,
                  (err, token) => {
                     if (err) throw err;

                     res.json({
                        token,
                        user: {
                           id: user._id,
                           firstName: user.firstName,
                           lastName: user.lastName,
                           email: user.email,
                        },
                     });
                  }
               );
            })
            .catch((err) => {
               if (err) throw err;
            });
      }
   });
});

export default router;
