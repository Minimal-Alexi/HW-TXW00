const jwt = require('jsonwebtoken');
let secretKey = 'Banana';

// Function to create and sign a JWT
function createJWT() {
    const payload = {
      userId: 123,
      username: 'exampleUser'
    };
  
    // Sign the JWT with the payload and secret key
    const token = jwt.sign(payload, secretKey);
  
    console.log('JWT Token:', token);

    return token
  }
  
  // Call the function to create and sign a JWT
const jwtTokenToVerify =  createJWT();
secretKey = "C";
const jwtToken2 = createJWT();

  // Function to verify a JWT
function verifyJWT(token) {
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('JWT Verification Failed:', err.message);
      } else {
        console.log('JWT Verified. Decoded:', decoded);
      }
    });
  }
  
  // Call the function to verify the JWT
  verifyJWT(jwtTokenToVerify);
  secretKey = 'Banana';
  verifyJWT(jwtToken2);