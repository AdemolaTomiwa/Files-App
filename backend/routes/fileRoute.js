import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

import File from '../models/fileModel.js';

// Get logged in user Files
// GET @/api/files
// Private
router.get('/', auth, (req, res) => {
   File.find({ user: req.user.id })
      .then((files) => res.status(200).json(files))
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Create File
// POST @/api/files
// Private
router.post('/', auth, (req, res) => {
   // Get files from Form
   const { fileName, fields, user, userObj } = req.body;

   // Create new File Obj
   const newFile = new File({
      fileName,
      fields,
      user,
      userObj,
   });

   // Save new file to Mongo DB
   newFile
      .save()
      .then((file) => {
         res.status(200).json(file);
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

export default router;
