// Base Person class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass extending Person
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  displayInfo() {
    return `${super.displayInfo()}, Grade: ${this.grade}`;
  }
}

// Teacher subclass extending Person
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

// Export classes
export { Person, Student, Teacher };
