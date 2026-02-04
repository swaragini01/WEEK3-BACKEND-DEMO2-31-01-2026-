import exp from 'express'
import { UserModel } from '../models/usermodel.js'

export const userApp = exp.Router()

//----------------------- USER ROUTES -----------------------

// GET all users
userApp.get('/users', async (req, res) => {
  try {
    const usersList = await UserModel.find()
    res.status(200).json({ message: "users", payload: usersList })
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message })
  }
})

// POST new user
userApp.post('/users', async (req, res) => {
  try {
    const newUserDoc = new UserModel(req.body)
    await newUserDoc.save()
    res.status(201).json(newUserDoc)
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message })
  }
})

// GET user by ID
userApp.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    res.status(200).json({ message: "user", payload: user })
  } catch (err) {
    res.status(400).json({ message: "Invalid user id", error: err.message })
  }
})

// PUT update user
userApp.put('/users/:id', async (req, res) => {
  try {
    const latestUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    res.status(200).json({ message: "modified", payload: latestUser })
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message })
  }
})

// DELETE user
userApp.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "deleted successfully", payload: deletedUser })
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message })
  }
})
