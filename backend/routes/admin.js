const express = require('express');
const { RecyclingEntry, WasteCollection, User } = require('../models');
const { authenticateToken, isAdmin } = require('../middleware/auth'); // Correct import
const router = express.Router();

router.use(authenticateToken);
router.use(isAdmin);

// Fetch all recycling activities
router.get('/recycling', async (req, res) => {
    try {
        const entries = await RecyclingEntry.findAll({ include: [User] });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving recycling entries: ' + error.message });
    }
});

router.get('/schedules', async (req, res) => {
    try {
      const schedules = await WasteCollection.findAll({
        include: {
          model: User,
          attributes: ['firstname', 'lastname', 'email'],
        },
      });
      console.log('Schedules:', JSON.stringify(schedules, null, 2));
      res.json(schedules);
    } catch (error) {
      console.error('Error retrieving schedules:', error);
      res.status(500).json({ error: 'Error retrieving schedules: ' + error.message });
    }
  });

module.exports = router;
