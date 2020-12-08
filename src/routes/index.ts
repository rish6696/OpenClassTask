import express,{ Router } from 'express'
import  authRouter  from './Auth.Router'
import storeRouter from './Store.Router'


export const router : Router = express.Router() 

router.use('/auth',authRouter)
router.use('/store',storeRouter)



