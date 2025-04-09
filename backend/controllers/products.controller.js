import Product from "../models/product.model.js"

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        if(products.length === 0) {
            return res.status(200).json({message : "No products to show!"})
        }

        res.status(200).json(products)

    } catch(err) {
        console.log("Error in getProducts controller : ", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const getProductInfo = async(req, res) => {
    try {
        const productId = req.params.id

        const product = await Product.findById(productId)
        .populate({
            path : 'feedbacks',
            options : {sort : {_id : -1}},
            populate : { path : 'user', select : 'username'}
        })

        if(!product) {
            return res.status(200).json({message : "Product not found!"})
        }

        res.status(200).json(product)

    } catch(err) {
        console.log("Error in getProductInfo controller : ", err)
        res.status(500).json({message : "Internal server error!"})
    }
}