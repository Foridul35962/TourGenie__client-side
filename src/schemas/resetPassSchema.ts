import {z} from 'zod'
import { passwordValidation } from './signUpSchema'

export const resetPassSchema = z.object({
    password: passwordValidation
})