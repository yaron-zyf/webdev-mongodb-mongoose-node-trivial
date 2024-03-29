const studentModel = require('../models/student.model.server');
const questionModel = require('../models/question.model.server');
const answerModel = require('../models/answer.model.server');
const quizWidgetModel = require('../models/quiz-widget.model.server');

const students = require('../student.mock');
const questions = require('../question.mock');
const answers = require('../answer.mock');

truncateDatabase = () =>
    answerModel.deleteMany({})
        .then(response => {
            if (response.ok) {
                console.log(response);
                return quizWidgetModel.deleteMany({})
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(response);
                return questionModel.deleteMany({})
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(response);
                return studentModel.deleteMany({})
            }
        })
        .then(response => {
            console.log(response)
        });

populateDatabase = () =>
    studentModel.insertMany(students)
        .then(response => {
            console.log(response);
            return questionModel.insertMany(questions)
        })
        .then(response => {
            console.log(response);
            return answerModel.insertMany(answers)
        })
        .then(response => console.log(response));

createStudent = student =>
    studentModel.create(student);

createQuestion = question =>
    questionModel.create(question);

answerQuestion = (studentId, questionId, answer) => {
    answer.student = studentId;
    answer.question = questionId;
    return answerModel.create(answer);
};

findAllStudents = () =>
    studentModel.find();

findStudentById = studentId =>
    studentModel.findById(studentId);

findAllQuestions = () =>
    questionModel.find();

findQuestionById = questionId =>
    questionModel.findById(questionId);

findAllAnswers = () =>
    answerModel.find();

findAnswerById = answerId =>
    answerModel.findById(answerId);

findAnswersByStudent = studentId =>
    answerModel.find({student: studentId});

findAnswersByQuestion = questionId =>
    answerModel.find({question: questionId});

findAllAnswersByStudent = (studentId, questionId) =>
    answerModel.find({student: studentId, question: questionId});

findAllAnswersByQuestion = (questionId, studentId) =>
    answerModel.find({question: questionId, student: studentId});

updateStudent = (studentId, student) =>
    studentModel.updateOne({_id: studentId}, {$set: student})
        .then(response => {
            console.log(response);
            return studentModel.findOne({_id: studentId})
        });

updateQuestion = (questionId, question) =>
    questionModel.updateOne({_id: questionId}, {$set: question})
        .then(response => {
            console.log(response);
            return questionModel.findOne({_id: questionId})
        });

updateAnswer = (answerId, answer) =>
    answerModel.updateOne({_id: answerId}, {$set: answer})
        .then(response => {
            console.log(response);
            return answerModel.findOne({_id: answerId})
        });

deleteStudent = studentId =>
    studentModel.deleteOne({_id: studentId})
        .then(() => {
            return answerModel.deleteMany({student: studentId})
        })
        .then(response => {
            console.log(response);
            return studentModel.find()
        });

deleteQuestion = questionId =>
    questionModel.deleteOne({_id: questionId})
        .then(() => {
            return answerModel.deleteMany({question: questionId})
        })
        .then(response => {
            console.log(response);
            return questionModel.find()
        });

deleteAnswer = answerId =>
    answerModel.deleteOne({_id: answerId})
        .then(response => {
            console.log(response);
            return answerModel.find()
        });

module.exports = {
    truncateDatabase,
    populateDatabase,
    createStudent,
    createQuestion,
    answerQuestion,
    findAllStudents,
    findStudentById,
    findAllQuestions,
    findQuestionById,
    findAllAnswers,
    findAnswerById,
    findAnswersByStudent,
    findAnswersByQuestion,
    findAllAnswersByStudent,
    findAllAnswersByQuestion,
    updateStudent,
    updateQuestion,
    updateAnswer,
    deleteStudent,
    deleteQuestion,
    deleteAnswer
};
