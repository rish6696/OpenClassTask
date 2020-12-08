import express, { Router } from 'express'
import { createValidator, ExpressJoiInstance } from 'express-joi-validation'
import { createStorePasswordValidator, loginValidator, registerStoreValidator } from '../validators/Auth.validator'
import { registerStoreController,logoutController, createStorePasswordController, loginStoreController} from '../controllers/Auth.controller'


const validator: ExpressJoiInstance = createValidator({})

const authRouter: Router = express.Router();


authRouter.route('/register/store')
    .post(validator.body(registerStoreValidator), registerStoreController)

authRouter.route('/store/password')
    .post(validator.body(createStorePasswordValidator),createStorePasswordController)

authRouter.route('/store/login')
    .post(validator.body(loginValidator),loginStoreController)


authRouter.route('/logout')
    .get(logoutController)

export default authRouter



