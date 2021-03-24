
import sequelizeConnection from '../config/dbConnection';
import { DataTypes } from 'sequelize';

import Joi from 'joi';

const passPattern =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z0-9\\S]{8,}$";

const UserValidator = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Não é um email válido",
        "string.empty": "O email é obrigatório"
    }),
    name: Joi.string().min(3).max(50).trim().required().messages({
        "string.min": "O nome deve ter pelo menos 3 letras",
        "string.max": "O nome não pode passar de 50 letras",
        "string.empty": "O nome é um campo obrigatório"
    }),
    password: Joi.string().pattern(new RegExp(passPattern)).messages({
        "string.pattern.base": "Pelo menos 8 caracteres, sendo 1 letra minúscula, 1 maiúscula, 1 número e um caracter especial."
    })
});


const User = sequelizeConnection.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export { UserValidator, User };
