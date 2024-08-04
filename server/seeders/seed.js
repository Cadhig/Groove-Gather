const mongoose = require("mongoose");
const Teacher = require("../models/Teachers.js");
const Class = require("../models/Class.js");

const seedDatabase = async () => {
  console.log("process.env.MONGO_URI", process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    await Teacher.deleteMany({});
    await Class.deleteMany({});

    const teacher1 = new Teacher({
      name: "Cadence",
      nextFestival: "Dance Fest 2024",
      bio: "Experienced in Advanced Shuffle and Hip Hop",
      danceStyles: ["Advanced Shuffle", "Hip Hop"],
      experience: 8,
      contactInfo: { phone: "123-456-7890" },
    });

    const teacher2 = new Teacher({
      name: "Cassie",
      nextFestival: "Advanced Ariel",
      bio: "SKilled ariel perfeormer",
      danceStyles: ["Salsa", "Latin"],
      experience: 5,
      contactInfo: { phone: "987-654-3210" },
    });

    await teacher1.save();
    await teacher2.save();

    const class1 = new Class({
      name: "Advanced Shuffle Class",
      instructor: teacher1._id,
      schedule: { day: "Monday", time: "6:00 PM" },
      duration: "1 hour",
      location: "Studio 1",
    });

    const class2 = new Class({
      name: "Intermediate Ariel",
      instructor: teacher2._id,
      schedule: { day: "Wednesday", time: "7:00 PM" },
      duration: "1.5 hours",
      location: "Studio 2",
    });

    await class1.save();
    await class2.save();

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
