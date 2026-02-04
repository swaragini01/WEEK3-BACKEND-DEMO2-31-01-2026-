import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    pid: {
      type: Number,
      required: [true, "id required"]
    },
    productname: {
      type: String,
      required: [true, "productname is required"]
    },
    price: {
      type: Number,
      required: [true, "price is required"]
    }
  },
  {
    strict: "throw",
    timestamps: true
  }
)

export const ProductModel = model("product", productSchema)
