import express from 'express';
import { signupuser,loginuser } from '../controller/user-controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { createPost,getAllPosts,getSinglePost,updatePost ,deletePost} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment,getAllComments,deleteComment } from '../controller/comment-controller.js';

const router=express.Router();


router.post('/signup',signupuser);
router.post('/login',loginuser);

router.post('/file/upload' ,upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);

router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getSinglePost);

router.put('/update/:id',authenticateToken,updatePost);

router.delete('/delete/:id',authenticateToken,deletePost);

router.post('/comment/new',authenticateToken,newComment);
router.get('/comments/:id',authenticateToken,getAllComments);
router.delete('/comment/delete/:id',authenticateToken,deleteComment);


export default router;