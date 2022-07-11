import express from 'express';
import cloudinary from '../middleware/cloudinary.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all files
router.post('/photos', async (req, res) => {
   try {
      const { id } = req.body;

      const { resources } = await cloudinary.v2.search
         .expression(`tags: ${id}`)
         .max_results(30)
         .execute();

      const url = resources.map((file) => file.url);

      res.json(url);
   } catch (err) {
      res.status(500).json({
         msg: 'Something went wrong! Image not uploaded!',
      });
   }
});
// Upload a photo
// POST @/api/upload
// Public
router.post('/', async (req, res) => {
   try {
      const { data, userId } = req.body;

      const uploadResponse = await cloudinary.v2.uploader.upload(data, {
         upload_preset: 'files_preset',
         tags: userId,
      });

      res.json({
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
            upload_preset: 'files_preset',
         }
      );

      res.send({ success: true });
   } catch (err) {
      res.status(500).json({
         msg: 'Something went wrong! Image not deleted!',
      });
   }
});

export default router;
