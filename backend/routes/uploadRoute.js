import express from 'express';
import cloudinary from '../middleware/cloudinary.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Upload a photo
// POST @/api/upload
// Public
router.post('/', async (req, res) => {
   try {
      const fileStr = req.body.data;

      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
         upload_preset: 'files',
      });

      res.send({
         url: uploadResponse.url,
         public_id: uploadResponse.public_id,
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({
         msg: 'Something went wrong! Image not uploaded!',
      });
   }
});

// Delete a photo
// DELETE@api/uploads/delete
router.post('/delete', async (req, res) => {
   try {
      const { public_id } = req.body;

      await cloudinary.uploader.destroy(
         public_id,
         { invalidate: true },
         {
            upload_preset: 'files',
         }
      );

      res.send({ success: true });
   } catch (err) {
      res.status(500).json({
         msg: 'Something went wrong! Image not uploaded!',
      });
   }
});

export default router;
