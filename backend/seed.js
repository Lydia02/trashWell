const { sequelize, User, Schedule } = require('./models'); // Adjust the path to your Sequelize models

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Drops and re-creates all tables

    // Create users
    const user = await User.create({
      firstname: 'John',
      lastname: 'Doe',
      address: '123 Main St',
      password: 'password', // Ensure this is hashed in a real scenario
      email: 'john.doe@example.com',
      role: 'user'
    });

    // Create schedules
    await Schedule.create({
      userId: user.id,
      date: new Date(),
      time: '10:00',
      location: '123 Main St'
    });

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
