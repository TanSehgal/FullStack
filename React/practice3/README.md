# Person Class Hierarchy with Student and Teacher Subclasses

## Objective
Understand and apply the concept of inheritance in JavaScript (ES6 classes) by creating a base class and extending it into specialized subclasses. This helps build strong foundational skills in object-oriented programming within a modern JavaScript context.

## Task Description
Create a base Person class that has properties like name and age, and a method to display basic information. Then, create two subclasses: Student and Teacher, each extending Person. The Student class should include an additional property like grade or course, and the Teacher class should include a property like subject or department. Each subclass should override or extend methods as needed to display complete details. Finally, create instances of both subclasses and demonstrate calling their methods to show how inheritance and method overriding work.

## Code Usage Instructions

### File Structure
- **person.js**: Contains the ES6 Person base class and Student/Teacher subclasses
- **demo.js**: Demonstrates creating instances of Student and Teacher and calling their methods
- **index.js**: Module entry point for importing classes

### Running the Code

1. **Using Node.js** (with ES6 module support):
   ```bash
   node demo.js
   ```
   Or add `"type": "module"` to your package.json and run:
   ```bash
   node demo.js
   ```

2. **Importing the Classes**:
   ```javascript
   import { Person, Student, Teacher } from './person.js';
   
   // Create instances
   const student = new Student('John Doe', 18, 'A');
   const teacher = new Teacher('Jane Smith', 35, 'Math');
   
   // Call methods
   console.log(student.displayInfo());
   console.log(teacher.displayInfo());
   ```

3. **Expected Output**:
   ```
   Student Info:
   Name: Alice Johnson, Age: 20, Grade: A
   
   Student Info:
   Name: Bob Smith, Age: 19, Grade: B+
   
   Teacher Info:
   Name: Dr. Sarah Williams, Age: 35, Subject: Mathematics
   
   Teacher Info:
   Name: Prof. John Davis, Age: 45, Subject: Computer Science
   
   Demonstrating Inheritance:
   Alice Johnson is 20 years old.
   Dr. Sarah Williams teaches Mathematics.
   ```

### Key Concepts Demonstrated
- **Inheritance**: Student and Teacher extend the Person base class
- **Constructor Chaining**: Subclasses use `super()` to call parent constructor
- **Method Overriding**: Subclasses override `displayInfo()` to add specialized information
- **Polymorphism**: All classes share the same method interface but with different implementations
