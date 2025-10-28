// Import classes from person.js
import { Person, Student, Teacher } from './person.js';

// Create a Student instance
const student1 = new Student('Alice Johnson', 20, 'A');
console.log('Student Info:');
console.log(student1.displayInfo());

// Create another Student instance
const student2 = new Student('Bob Smith', 19, 'B+');
console.log('\nStudent Info:');
console.log(student2.displayInfo());

// Create a Teacher instance
const teacher1 = new Teacher('Dr. Sarah Williams', 35, 'Mathematics');
console.log('\nTeacher Info:');
console.log(teacher1.displayInfo());

// Create another Teacher instance
const teacher2 = new Teacher('Prof. John Davis', 45, 'Computer Science');
console.log('\nTeacher Info:');
console.log(teacher2.displayInfo());

// Demonstrate inheritance - accessing base class properties
console.log('\nDemonstrating Inheritance:');
console.log(`${student1.name} is ${student1.age} years old.`);
console.log(`${teacher1.name} teaches ${teacher1.subject}.`);
