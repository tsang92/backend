const express = require('express');
const router = express.Router();
const Group = require('./../models/Group');
const Message = require('./../models/Message');
const path = require('path');

// Get a group by name
router.get('/search/:name', async (req, res) => {
  try {
    const group = await Group.findOne({ name: req.params.name });
    if (!group) {
      return res.status(404).send('Group not found');
    }
    res.send(group);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get a group by name
router.put('/:id', async (req, res) => {
  Group.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(group => res.json(group))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating user',
        error: err
      });
    });
});

// POST - add member to group
router.post('/:groupId/add/:userId', async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send('Group not found');
    }
    group.members.push(userId);
    await group.save()
      .then(group => {
        // success!
        // return 201 status with user object
        return res.status(201).json(group);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send({
          message: 'Problem adding user account to group',
          error: err
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET - get all messages for group
router.get('/:id/messages', async (req, res) => {
  try {
    // Find the group with the given ID and populate its messages
    const group = await Group.findById(req.params.id).populate('messages');

    // If the group was not found, return a 404 status code
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Return the array of messages for the group
    res.json(group.messages);
  } catch (err) {
    // If an error occurred, return a 500 status code
    res.status(500).json({ error: 'Server error' });
  }
});

// POST - add message to group
router.post('/:groupId/addMessage/:messageId', async (req, res) => {
  const groupId = req.params.groupId;
  const messageId = req.params.messageId;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send('Group not found');
    }

    group.messages.push(messageId);
    await group.save()
      .then(group => {
        // success!
        // return 201 status with user object
        return res.status(201).json(group);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send({
          message: 'Problem adding message to group',
          error: err
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET - get all members for group
router.get('/:id/members', async (req, res) => {
  try {
    // Find the group with the given ID and populate its members
    const group = await Group.findById(req.params.id).populate('members');

    // If the group was not found, return a 404 status code
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Return the array of members for the group
    res.json(group.members);
  } catch (err) {
    // If an error occurred, return a 500 status code
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
