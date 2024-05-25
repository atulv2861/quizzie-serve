const express = require('express');
const router= express.Router();
const app= express();
const { createQuiz, getAllQuiz, getQuizById, getQuizByUserId, getTrendingQuiz, deleteQuiz } = require('../controller/quizController');
const { isAuth } = require('../middleware/authMiddleware');

// Quizzes
// router.post("/createQuiz",isAuth,createQuiz);
// router.get("/getAllQuizzes",isAuth,getAllQuiz);
// router.get("/getQuizById/:quizId",getQuizById);
// router.get("/getQuizByUserId", isAuth,getQuizByUserId);
// router.get("/getTrendingQuizzes",isAuth,getTrendingQuiz);
// router.delete("/deleteQuizById",isAuth,deleteQuiz);

module.exports=router;