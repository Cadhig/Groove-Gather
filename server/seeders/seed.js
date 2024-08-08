const mongoose = require("mongoose");
const Teacher = require("../models/Teachers.js");
const Class = require("../models/Class.js");
const db = require('../config/connection');
const cleanDB = require('./cleanDB');

const teacherData = require('./teacherData.json');
const classData = require('./classData.json');

db.once('open', async () => {
  try {
    // Clean the database
    await cleanDB("Teacher", "teachers");
    await cleanDB("Class", "classes");

    // Bulk create each model
    const teachers = await Teacher.insertMany(teacherData);
    const classes = await Class.insertMany(classData);

    for (let newClass of classes) {
      // Randomly assign an instructor to each class
      const tempTeacher = teachers[Math.floor(Math.random() * teachers.length)];
      newClass.instructor = tempTeacher._id;
      await newClass.save();

      // Reference the class on the teacher model
      tempTeacher.classes = tempTeacher.classes || [];
      tempTeacher.classes.push(newClass._id);
      await tempTeacher.save();
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
});
