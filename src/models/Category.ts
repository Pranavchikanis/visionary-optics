import mongoose, { Schema, model, models } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

const Category = models.Category || model('Category', categorySchema);
export default Category;
