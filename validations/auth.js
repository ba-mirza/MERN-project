import {body} from 'express-validator'

export const registerValidator = [
    body('fullName', 'is not valid: length must be minimum 3').isLength({min: 3}),
    body('email', 'email is not valid').isEmail(),
    body('passwordHash', 'password is not valid: length must be minimum 5').isLength({min: 5}),
    body('avatarUrl', 'error: not valid optional link').optional().isURL(),
]
