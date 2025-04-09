import mongoose from "mongoose"

export default async function connectDB() {
    await mongoose.connect(process.env.MONGO_ATLAS_URI)
    .then(() => console.log("DB connection successful!"))
    .catch((err) => console.log("Unable to connect to DB :", err))
}