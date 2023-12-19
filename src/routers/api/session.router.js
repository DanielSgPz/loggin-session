import { Router } from "express";
import { usuariosManager } from "../../models/user.js";
export const sesionesRouter = Router()

sesionesRouter.post('/login', async (req, res) => {

    const { email, password } = req.body
    let datosUsuario
    
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        datosUsuario = {
          email: 'admin',
          nombre: 'admin',
          apellido: 'admin',
        }
      } else {
        const usuario = await usuariosManager.findOne({ email }).lean()
    
        if (!usuario) {
          return res.status(400).json({ status: 'error', message: 'login failed' })
        }
    
        // deberia encriptar la recibida y comparar con la guardada que ya esta encriptada
        if (password !== usuario.password) {
          return res.status(400).json({ status: 'error', message: 'login failed' })
        }
    
        datosUsuario = {
          email: usuario.email,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
        }
      }

    req.session['user'] = datosUsuario
    res.status(201).json({ status: 'success', message: 'login success' })
})

sesionesRouter.get('/', (req, res) => {
    if (req.session['user']) {
        return res.json(req.session['user'])
    }
    res.status(400).json({status: 'error', message: 'no hay una sesion iniciada'})
})

sesionesRouter.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ status: 'Error en Logout', body: error })
        }
        res.status(200).json({ status: 'Success', message: 'Loguot Ok' })
    })
})