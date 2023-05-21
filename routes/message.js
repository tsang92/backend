const express = require('express');
const router = express.Router();
const Message = require('./../models/Message');
const path = require('path');

// Get a message by id
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.send(message);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST - add message
router.post('/', async (req, res) => {
  try {
    const { author, title, message } = req.body;

    // Create new message instance
    const newMessage = new Message({
      author,
      title,
      message
    });

    // Save new message instance to the database
    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST - add message comment
router.post('/:id', async (req, res) => {
  const { author, userComment } = req.body;

  try {
    // Find the message by its ID and update the comments array
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.comments.push({ author, userComment });
    await message.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
