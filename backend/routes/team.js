import express from 'express';
import Team from '../models/Team.js';
import { authenticate as auth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
  try {
    const team = await Team.find({ isActive: true }).sort({ order: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create team member (Admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add team members' });
    }

    const { name, role, description, email, phone, socialLinks, order } = req.body;

    // Validate required fields
    if (!name || !role || !description) {
      return res.status(400).json({ message: 'Name, role, and description are required' });
    }

    let image = req.body.image;
    let imageData = null;

    if (req.file) {
      // Read file and convert to base64
      const fs = await import('fs').then(m => m.default);
      const filePath = req.file.path;
      const fileBuffer = fs.readFileSync(filePath);
      imageData = fileBuffer.toString('base64');
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.imageData) {
      // If base64 data is sent directly
      imageData = req.body.imageData;
      image = 'data:image/jpeg;base64,' + imageData.substring(0, 50) + '...';
    }

    const team = new Team({
      name,
      role,
      description,
      image,
      imageData,
      email,
      phone,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
      order: order || 0
    });

    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update team member (Admin only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update team members' });
    }

    const { name, role, description, email, phone, socialLinks, order, isActive } = req.body;

    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Update fields
    if (name) member.name = name;
    if (role) member.role = role;
    if (description) member.description = description;
    if (email) member.email = email;
    if (phone) member.phone = phone;
    if (socialLinks) member.socialLinks = JSON.parse(socialLinks);
    if (order !== undefined) member.order = order;
    if (isActive !== undefined) member.isActive = isActive;

    // Update image if provided
    if (req.file) {
      const fs = await import('fs').then(m => m.default);
      const filePath = req.file.path;
      const fileBuffer = fs.readFileSync(filePath);
      member.imageData = fileBuffer.toString('base64');
      member.image = `/uploads/${req.file.filename}`;
    } else if (req.body.imageData && req.body.imageData !== member.imageData) {
      member.imageData = req.body.imageData;
      member.image = 'data:image/jpeg;base64,' + req.body.imageData.substring(0, 50) + '...';
    } else if (req.body.image && !req.body.image.startsWith('data:')) {
      member.image = req.body.image;
    }

    member.updatedAt = Date.now();
    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete team member (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete team members' });
    }

    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
