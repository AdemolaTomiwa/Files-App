import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
   try {
      console.log(req.body);
   } catch (error) {
      console.log(err);
   }
});

export default router;
