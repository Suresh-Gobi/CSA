const db = require('../Models/index');
const { Ticket } = db;

// Create a new ticket [user]
exports.createTicket = async (req, res) => {
  const { title, description, priority } = req.body;

  // Validate required fields
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: 'Title and description are required fields.',
    });
  }

  try {
    const newTicket = await Ticket.create({
      title,
      description,
      priority: priority || 'medium',
      userId: req.user?.id || null,
    });
    
    res.status(201).json({
      success: true,
      data: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating the ticket',
    });
  }
};
