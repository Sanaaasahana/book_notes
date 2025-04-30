const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      const dbUser = await User.findByEmail(user.email);
      if (!dbUser) {
        return res.sendStatus(403);
      }
      
      req.user = dbUser;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJWT };