import exp from 'express'
import { ProductModel } from '../models/productmodel.js'

export const productApp = exp.Router()

//----------------------- PRODUCT ROUTES -----------------------

// GET all products
productApp.get('/products', async (req, res) => {
  try {
    const productsList = await ProductModel.find()
    res.status(200).json({ message: "products", payload: productsList })
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message })
  }
})

// POST new product
productApp.post('/products', async (req, res) => {
  try {
    const newProductDoc = new ProductModel(req.body)
    await newProductDoc.save()
    res.status(201).json(newProductDoc)
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err.message })
  }
})

// GET product by ID
productApp.get('/products/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
    res.status(200).json({ message: "product", payload: product })
  } catch (err) {
    res.status(400).json({ message: "Invalid product id", error: err.message })
  }
})

// PUT update product
productApp.put('/products/:id', async (req, res) => {
  try {
    const latestProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    res.status(200).json({ message: "modified", payload: latestProduct })
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message })
  }
})
