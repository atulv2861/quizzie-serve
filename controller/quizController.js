const Quiz = require("../model/quizSchema");
const mongoose = require('mongoose')

const createQuiz = async (req, res) => {
  try {
    const { quizName, quizType, quizQuestion } = req.body
    if (!quizName || !quizType || !quizQuestion) {
      return res.status(400).json({
        success: false,
        message: "Quiz details are not correct!"
      });
    }
    const quiz = { ...req.body, userId: req.user._id };
    const newQuiz = new Quiz(quiz);
    const quizDetails = await newQuiz.save();
    res.status(201).json({
      success: true,
      quiz: quizDetails,
      messages: "New quiz created!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getAllQuiz = async (req, res) => {
  try {
    const allQuiz = await Quiz.find();
    if (!allQuiz)
      return res.status(400).json({
        success: false,
        message: "Quizzes are not present!"
      });
    res.status(201).json({
      success: true,
      allQuiz: allQuiz,
      messages: "Get all quizzes!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
const getQuizById = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    await Quiz.findByIdAndUpdate(
      quizId,
      { $inc: { impression: 1 } }, 
      { new: true }
    ).exec();
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
      return res.status(400).json({
        success: false,
        messages: "Quiz not found!"
      })
    }
    res.status(201).json({
      success: true,
      quiz: quiz,
      messages: "Get your quiz!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getQuizByUserId = async (req, res) => {
  try {

    const quizzes = await Quiz.find({ userId: new mongoose.Types.ObjectId(req.params.userId + "") }).sort({ createdAt: -1 });
    if (!quizzes)
      return res.status(400).json({
        success: false,
        message: "Quizzes not found!"
      });
    res.status(201).json({
      success: true,
      quizzes: quizzes,
      messages: "Get your quizzes!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getTrendingQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ impression: { $gt: 10 } });
    if (!quizzes)
      return res.status(400).json({
        success: false,
        message: "Trending quizzes are not found!"
      });
    res.status(201).json({
      success: true,
      quizzes: quizzes,
      messages: "Get trending quizzes!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const deleteQuiz=async (req,res)=>{
  try {
    const quiz = await Quiz.findOneAndDelete(req.params.quizId);
    if (!quiz)
      return res.status(400).json({
        success: false,
        message: "Something went wrong!"
      });
    res.status(201).json({
      success: true,
      quiz: quiz,
      messages: "quiz is successfully deleted!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


module.exports = {
  createQuiz,
  getAllQuiz,
  getQuizById,
  getQuizByUserId,
  getTrendingQuiz,
  deleteQuiz
};