const userModel = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (email, password) => {

  try {
    const user = await userModel.findByUsername(email);
    console.log(email);
    if (!user) {
      console.log('user wrong')
      return { error: 'Invalid credentials' };
      
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    // console.log(password);
    // console.log(user.password);
    // if (!passwordMatch) {
      
    //   console.log('password wrong');
    //   return { error: 'Invalid credentials' };
      
    // }

    if (password !== user.password) {
      console.log('password wrong');
      return { error: 'Invalid credentials' };
    }

    
    const token = generateAuthToken(user);
    const user_details = await userModel.getUser(email);
    const user_type = user_details.type
    const fullName = user_details.fullName
    return { fullName, user_type, email, token };
  } catch (error) {
    console.error('Error during login:', error);
    return { error: 'Internal server error' };
  }

};

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    'your_jwt_secret_key', // Replace with your actual secret key
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = { authenticateUser };
