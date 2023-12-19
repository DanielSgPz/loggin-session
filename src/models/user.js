import mongoose from "mongoose";
import { randomUUID } from "crypto"

const collecion = 'Users'

const schema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    level: { type: String, require: true, default: 'client'},
    salt: { type: String, require: true }
}, {
    strict: 'throw',
    versionKey: false,
})

export const Usuario = mongoose.model(collecion, schema)