import express from 'express';
import{
   getLoggedInUsers,
   getMessage,
   sendMessage
} from "../controllers/message.controller.js";

import { auth } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('./users' , auth , getLoggedInUsers);
router.get('/:id' , auth , getMessage);

router.post('/send/:id' , auth , sendMessage);


export default router;