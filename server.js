import exp from 'express'
import { connect } from 'mongoose'
import { userApp } from './APIs/userApi.js'
import { productApp } from './APIs/productApi.js'


const app = exp()
const port = 4000

app.use(exp.json())
app.use('/user-api', userApp)
app.use('/product-api', productApp)

async function connectDB() {
  try {
    await connect('mongodb://localhost:27017/anuragdb2')
    console.log("Database connected")
    app.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (err) {
    console.error("DB connection error", err)
  }
}

connectDB()
