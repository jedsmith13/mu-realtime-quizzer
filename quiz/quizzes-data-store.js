const uuid = require('uuid-v4');

// Should be in a database but using variables for brevity
let quizzes = {};

// Classes methods
// Create a new class
const create = question => {
    const id = uuid();
    const quiz = {
        question: question,
        id: id
    };

    return quizzes[id] = quiz;
};

// get a class
const get = id => {
  if (!id) return quizzes;
  return quizzes[id];
};

const attachClass = (id, className, classMembers) => {
    let quiz = get(id);
    if (quiz) {
        quiz.className = className;
        quiz.classMembers = classMembers;
    }
};

const addAnswer = (id, classMemberId, answer) => {
    let quiz = get(id);
    if (quiz) {
        let classMembers = quiz.classMembers;
        classMembers.forEach(classMember => {
            if (classMember.id === classMemberId) {
                classMember.answer = answer;
            }
        });
    }
};

const methods = {
    create: create,
    get: get,
    attachClass: attachClass,
    addAnswer: addAnswer
};

module.exports = methods;
