import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

import File from '../models/fileModel.js';

// Get logged in user Files
// GET @/api/files
// Private
router.get('/', auth, (req, res) => {
   const keyword = req.query.keyword
      ? {
           $or: [
              {
                 fileName: {
                    $regex: req.query.keyword,
                    $options: 'i',
                 },
              },
              {
                 fields: {
                    $regex: req.query.keyword,
                    $options: 'i',
                 },
              },
              {
                 photos: {
                    $regex: req.query.keyword,
                    $options: 'i',
                 },
              },
           ],
        }
      : {};

   File.find({ user: req.user.id, ...keyword })
      .sort({ createdAt: -1 })
      .then((files) => res.status(200).json(files))
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Get logged in user recent Files
// GET @/api/files
// Private
router.get('/recent', auth, (req, res) => {
   File.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .limit(2)
      .then((files) => res.status(200).json(files))
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Get single user file
// GET @/api/files/:id
// Private
router.get('/:id', auth, (req, res) => {
   File.findById(req.params.id)
      .then((file) => {
         if (file) {
            res.status(200).json(file);
         } else {
            res.status(400).json({
               msg: 'File does not exist! An error occured!',
            });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Create File
// POST @/api/files
// Private
router.post('/', auth, (req, res) => {
   // Get files from Form
   const { fileName, fields, user } = req.body;

   // Create new File Obj
   const newFile = new File({
      fileName,
      fields,
      favorite: false,
      user,
   });

   // Save new file to Mongo DB
   newFile
      .save()
      .then((file) => {
         res.status(200).json(file);
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Update and add a field to a file
// PUT @/api/files/update
// Private
router.put('/update', auth, (req, res) => {
   const { fileName, fields, user, id, photos, favorite } = req.body;

   File.findById(id)
      .then((file) => {
         if (file) {
            file.fileName = fileName || file.fileName;
            file.fields = fields || file.fields;
            file.user = user || file.user;
            file.favorite = favorite || file.favorite;
            file.photos = photos || file.photos;

            file
               .save()
               .then(() => res.status(201).json(file))
               .catch((err) =>
                  res.status(400).json({ msg: 'An error occured!' })
               );
         } else {
            res.status(400).json({ msg: 'File not found!' });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Update a field file
// PUT @/api/files/update/field
// Private
router.put('/update/field', auth, (req, res) => {
   const { id, fields } = req.body;

   File.findById(id)
      .then((file) => {
         if (file) {
            file.fields = fields || file.fields;

            file
               .save()
               .then(() => res.status(201).json(file))
               .catch((err) =>
                  res.status(400).json({ msg: 'An error occured!' })
               );
         } else {
            res.status(400).json({ msg: 'File does not exist!' });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Delete a file field by updating
// PUT @/api/files/:id
// Private
router.put('/field/:id', auth, (req, res) => {
   const { field } = req.body;

   File.findById(req.params.id)
      .then((file) => {
         if (file) {
            file.fields = file.fields.filter((fil) => fil.id !== field);

            file
               .save()
               .then((file) => res.status(201).json(file))
               .catch((err) =>
                  res.status(400).json({ msg: 'Field not deleted!' })
               );
         } else {
            res.status(400).json({ msg: 'Field does not exist!' });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Delete a single file
// DELETE @/api/delete/:id
// Private
router.delete('/:id', auth, (req, res) => {
   File.findById(req.params.id)
      .then((file) => {
         if (file) {
            file
               .remove()
               .then(() => res.status(200).json({ success: true }))
               .catch((err) =>
                  res.status(400).json({ msg: 'An error occured!' })
               );
         } else {
            res.status(400).json({ msg: 'File does not exist!' });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

export default router;
