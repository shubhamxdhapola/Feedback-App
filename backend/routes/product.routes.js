import express from 'express'
import { getProductInfo, getProducts } from '../controllers/products.controller.js'

const productRoutes = express.Router()

productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProductInfo)
export default productRoutes