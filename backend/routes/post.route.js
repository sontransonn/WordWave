import express from 'express';

import postController from '../controllers/post.controller.js';

import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get('/getposts', postController.getposts)
router.get('/get_post_by_postId/:postId', postController.get_post_by_postId)

router.post('/create', authMiddleware.authToken, postController.create)

router.put('/updatepost/:postId/:userId', authMiddleware.authToken, postController.updatepost)

router.delete('/deletepost/:postId/:userId', authMiddleware.authToken, postController.deletepost)

export default router;