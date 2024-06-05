// routes/recycling.js
const express = require('express');
const { RecyclingEntry } = require('../models');
const authenticateToken = require('../middleware/auth'); // Ensure this path is correct
const router = express.Router();

router.use(authenticateToken); // Apply authentication to all recycling routes

// Log a new recycling activity
router.post('/', async (req, res) => {
    try {
        const { date, material, amount } = req.body;
        const userId = req.user.id; // Authenticated user's ID
        const newEntry = await RecyclingEntry.create({ date, material, amount, userId });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error logging recycling activity: ' + error.message });
    }
});

// Get all recycling entries for a user
router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const entries = await RecyclingEntry.findAll({ where: { userId } });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving recycling entries: ' + error.message });
    }
});

// Update an existing recycling entry
router.put('/:id', async (req, res) => {
    try {
        const { date, material, amount } = req.body;
        const { id } = req.params;
        const updated = await RecyclingEntry.update({ date, material, amount }, { where: { id, userId: req.user.id } });
        res.json({ message: 'Recycling entry updated successfully', updated });
    } catch (error) {
        res.status(500).json({ error: 'Error updating recycling entry: ' + error.message });
    }
});

// Delete a recycling entry
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await RecyclingEntry.destroy({ where: { id, userId: req.user.id } });
        res.json({ message: 'Recycling entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting recycling entry: ' + error.message });
    }
});

module.exports = router;
