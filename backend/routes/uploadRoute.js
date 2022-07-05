import express from 'express';
import cloudinary from '../middleware/cloudinary.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Login a User
// POST @/api/auth
// Public
router.post('/', async (req, res) => {
   try {
      const fileStr = req.body.data;

      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
         upload_preset: 'files',
      });

      res.send(uploadResponse.url);
   } catch (err) {
      console.error(err);
      res.status(500).json({
         msg: 'Something went wrong! Image not uploaded!',
      });
   }
});

export default router;
