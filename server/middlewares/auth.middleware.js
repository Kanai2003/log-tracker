import { asyncHandler } from "../utils/asyncHandler.js";

import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'JWT-Secret-code')

    const user = await User.findById(decodedToken._id)
    
    if(!user){
        return res.status(401).json({message: "Unauthorized"})
    }

    if(user.role !== "admin"){
        return res.status(401).json({message: "You don't have permission to access this route, only admin can access this route"})
    }

    req.user = user

    next();
})

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'JWT-Secret-code')

    const user = await User.findById(decodedToken._id)
    
    if(!user){
        return res.status(401).json({message: "Unauthorized"})
    }

    req.user = user

    next();
})

