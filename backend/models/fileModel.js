import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      fileName: {
         type: String,
         required: true,
      },
      fields: [mongoose.Schema.Types.Mixed],
      photos: [mongoose.Schema.Types.Mixed],
   },
   {
      strict: false,
      timestamps: true,
   }
);

const File = mongoose.model('file', fileSchema);

export default File;
