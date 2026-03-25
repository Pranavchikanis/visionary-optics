import mongoose, { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, required: true, default: 0 },
    variants: [
      {
        name: String,
        options: [String],
      },
    ],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models.Product || model('Product', productSchema);
export default Product;
