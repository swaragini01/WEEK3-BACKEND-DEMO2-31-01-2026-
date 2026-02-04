import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username required"],
      minlength: [4, "min length should be 4"],
      maxlength: [6, "max length exceeded"]
    },
    password: {
      type: String,
      required: [true, "password is required"]
    },
    age: {
      type: Number,
      required: [true, "age is required"],
      min: [18, "age should be above 18"],
      max: [25, "age should be below 25"]
    }
  },
  {
    strict: "throw",
    timestamps: true
  }
)

export const UserModel = model("user", userSchema)
