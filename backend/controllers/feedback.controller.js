import Feedback from "../models/feedback.model.js"
import Product from "../models/product.model.js"

export const addFeedback = async(req, res) => {
    try {
        const { title, description } = req.body
        const userId  = req.user._id
        const productId = req.params.id
    
        if(!title || !description) {
            return res.status(400).json({message : "All fields are required!"})
        }

        const product = await Product.findById(productId)   
        if(!product) {
            return res.status(404).json({message : "Product not found!"})
        }

        const feedback = await Feedback.create({
            title,
            description,
            user : userId
        })
        
        product.feedbacks.push(feedback._id)
        await product.save()

        const updatedProduct = await Product.findById(productId).populate({
            path: 'feedbacks',
            options: { sort: { _id: -1 } },
            populate: { path: 'user', select: 'username' }
        }).sort({_id : -1})

        res.status(200).json({product : updatedProduct, message : "Feedback added successfully!"})

    } catch(err) {
        console.log("Error in addFeedback controller : ", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const getFeedbacks = async(req, res) => {
    try {
        const productId = req.params.id

        const product = await Product.findById(productId)
        .populate({
            path : 'feedbacks',
            populate : { path : 'user', select : 'username'}
        })
        
        if(!product) {
            return res.status(400).json({message : "Product not found!"})
        }

        res.status(200).json({product})

    } catch(err) {
        console.log("Error in getFeedbacks controller : ", err)
        res.status(500).json({message : "Internal server error!"})
    }
}