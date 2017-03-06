const shortid = require('shortid');

// Should be in a database but using variables for brevity
let classes = {};


// Classes methods
// Create a new class
const create = (className) => {
    return classes[className] = {
      signIn: shortid.generate(),
      classMembers: [],
      trainers: []
    };
};

// get a class
const get = (className) => {
  if (!className) return;
  return classes[className];
};

// Added a student to a class
// classMember(Object) {name: string, connectionId: string}
const addClassMember = (signIn, classMember) => {
  
  // Get a list of classMembers
  let classMembers;
  let className;
  for (let name in classes) {
    if (!classes.hasOwnProperty(name)) continue;
    
    let currentClass = classes[name];
    
    if (currentClass.signIn === signIn) {
      classMembers = currentClass.classMembers;
      className = name;
    }
  }
  
  if (!classMembers) return new Error('Class does not exist');
  
  // classMember mapped to just connectionId so we can check on classMember.connectionId.
  if (classMembers.map((classMemberObj) => classMemberObj.connectionId).indexOf(classMember.connectionId) >= 0) return new Error('Class member already exists');
  
  classMembers.push(classMember);
  
  return className;
};

// Remove a trainer from a class
const removeClassMember = (className, classMember) => {
  //TODO: Implement
};

// get the class members for a class
const getClassMembers = (className) => {
  if (!className) return;
  return classes[className].classMembers;
};

// Added a trainer to a class
const addTrainer = (className, trainer) => {
  let currentClass = classes[className];
  
  if (!currentClass) return new Error('Class does not exist');

  if (currentClass.trainers.map((trainerObj) => trainerObj.connectionId).indexOf(trainer.connectionId) >= 0) return new Error('Trainer already exists');
  
  currentClass.trainers.push(trainer);
  
  return currentClass;
};

// Remove a trainer from a class
const removeTrainer = (className, trainer) => {
  //TODO: Implement
};

// get the class members for a class
const getTrainers = (className) => {
  if (!className) return;
  return classes[className].trainers;
};

const methods = {
    create: create,
    get: get,
    classMembers: {
      add: addClassMember,
      remove: removeClassMember,
      get: getClassMembers      
    },
    trainers: {
      add: addTrainer,
      remove: removeTrainer,
      get: getTrainers
    }
};

module.exports = methods;
