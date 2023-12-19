import { Router, json, urlencoded } from "express";
import { usuariosRuters } from "./usuarios.router.js";
import { sessionRouter } from "./session.router.js";

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use ("/sesiones", sessionRouter)
apiRouter.use ("/usuarios", usuariosRuters)