const authService = require('../Services/service');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.authenticateUser(email, password);
    if (result.error) {
      res.status(401).json({ error: result.error });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginController };
