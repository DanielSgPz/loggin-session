import { Router } from "express";
import { usuariosManager } from "../../models/user.js";
import { soloLogueadosApi } from "../../middlewares/session.js";


export const userRouter = Router()

userRouter.post('/register', async (req, res) => {
    try {
        
        const usuario  = await usuariosManager.create(req.body)
        res.status(201).json({ status: "success", payload: newUser })
    } catch (error) {
        res.status(500).json({ status: "error", mesagge: error.mesagge })
    }
})

userRouter.get('/profile', soloLogueadosApi, async (req, res) => {
    const usuario  = await usuariosManager.findOne({ email: req.session['user'].email }, { password: 0 }).lean()
    res.status(200).json({ status: 'success', payload: usuario })
})