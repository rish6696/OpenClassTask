import express, { Router } from 'express'
import { createValidator, ExpressJoiInstance } from 'express-joi-validation'
import { createClassValidator } from '../validators/Store.validator'
import { createClassController } from '../controllers/Store.Controller'
import { verifyJwtToken } from '../middlewares/authMiddleware'


const validator: ExpressJoiInstance = createValidator({})

export const storeRouter: Router = express.Router();


storeRouter.route('/class')
    .post(validator.body(createClassValidator), verifyJwtToken,createClassController)

export default storeRouter;




