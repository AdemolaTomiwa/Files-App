import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';

const router = express.Router();

import User from '../models/userModel.js';

// Check for existing user
// POST @/api/users
// Public
router.post('/check', (req, res) => {
   const { email } = req.body;

   // Check if user entered email

   if (!email) {
      return res.status(400).json({ msg: 'Please enter email!' });
   }

   User.findOne({ email })
      .then((user) => {
         if (user) {
            res.status(400).json({ msg: 'User already exists!' });
         } else {
            res.status(200).json({ success: true });
         }
      })
      .catch((err) => console.log(err));
});

// Register New User
// POST @/api/users
// Public
router.post('/', (req, res) => {
   // Bring out the details
   const { firstName, lastName, email, password } = req.body;

   // Check is email already exist and return
   User.findOne({ email }).then((user) => {
      if (user) {
         return res.status(400).json({ msg: 'User already exists!' });
      }

      // Validation
      if (!firstName || !lastName || !password) {
         res.status(400).json({ msg: 'Please enter fields!' });
      } else if (password.length < 6) {
         res.status(400).json({
            msg: 'Password length should be at least 6 character long!',
         });
      } else {
         // Create new user object
         const newUser = new User({
            firstName,
            lastName,
            email,
            password,
         });

         // Create hash and hash the user password
         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               if (err) throw err;
               newUser.password = hash;

               // Save user to DB
               newUser
                  .save()
                  .then((user) => {
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
            });
         });
      }
   });
});

// Get all users
router.get('/', (req, res) => {
   User.find()
      .then((user) => res.send(user))
      .catch((err) => res.send(err));
});

// Get user details
router.get('/:id', auth, (req, res) => {
   User.findById(req.params.id)
      .select('-password')
      .then((user) => {
         res.status(200).json(user);
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured' }));
});

// Update user
router.put('/', auth, (req, res) => {
   const { firstName, lastName, password, id } = req.body;

   User.findById(id)
      .then((user) => {
         if (user) {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;

            if (password) {
               user.password = password;
            }

            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(user.password, salt, (err, hash) => {
                  if (err) throw err;

                  user.password = hash;

                  // Save user to DB
                  user
                     .save()
                     .then((user) => {
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
               });
            });
         } else {
            res.status(400).json({ msg: 'An error occured!' });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured' }));
});

export default router;
