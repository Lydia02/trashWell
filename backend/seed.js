const { User, RecyclingEntry, WasteCollection } = require('./models'); // Ensure models are correctly imported
const sequelize = require('./config/database'); // Ensure you import the sequelize instance

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Create Users
    const users = [
      { firstname: 'John', lastname: 'Doe', address: '123 Main St', password: 'password', email: 'john@example.com', role: 'user' },
      { firstname: 'Jane', lastname: 'Smith', address: '456 Elm St', password: 'password', email: 'jane@example.com', role: 'admin' }
    ];

    for (const user of users) {
      try {
        await User.create(user);
        console.log(`User ${user.firstname} ${user.lastname} created`);
      } catch (error) {
        console.error(`Error creating user ${user.firstname} ${user.lastname}:`, error);
      }
    }

    // Create RecyclingEntries
    const recyclingEntries = [
      { date: new Date(), material: 'Plastic', amount: 2.5, userId: 1 },
      { date: new Date(), material: 'Glass', amount: 1.5, userId: 2 }
    ];

    for (const entry of recyclingEntries) {
      try {
        await RecyclingEntry.create(entry);
        console.log(`Recycling entry for ${entry.material} created`);
      } catch (error) {
        console.error(`Error creating recycling entry for ${entry.material}:`, error);
      }
    }

    // Create WasteCollections
    const wasteCollections = [
      { date: new Date(), time: '10:00', status: 'scheduled', userId: 1 },
      { date: new Date(), time: '14:00', status: 'scheduled', userId: 2 }
    ];

    for (const collection of wasteCollections) {
      try {
        await WasteCollection.create(collection);
        console.log(`Waste collection on ${collection.date} at ${collection.time} created`);
      } catch (error) {
        console.error(`Error creating waste collection on ${collection.date}:`, error);
      }
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
