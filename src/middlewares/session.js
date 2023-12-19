import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_STR_CNX, SESSION_SECRET  } from '../config.js'

const store = connectMongo.create({
    mongoUrl: MONGODB_STR_CNX,
    ttl: 60*60*24
})

export const sesiones = session({
    store,
    secret: SESSION_SECRET ,
    resave: true,
    saveUninitialized: true
})

export function soloLogueadosApi (req, res, next) {
    if (!req.session['user']) {
        return res.status(400).json({status: 'Error', message: 'necesita iniciar sesion'})
    }
    next()
}

export function soloLogueadosWeb (req, res, next) {
    if (!req.session['user']) {
        return res.redirect('/')
    }
    next()
}