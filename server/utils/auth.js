const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');


const SECRET_KEY = 'dontaskdonttell';
const expiration= '1h';


module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = token.split(' ').pop().trim();
  }
  if (!token) {
    return req;
  }
  try {
    const { authenticatedPerson } = jwt.verify(token, SECRET_KEY, { maxAge: expiration});
    req.user = authenticatedPerson;
  } catch (err) {
    console.error('Invalid token:', err.message);
  }
  return req;
},
signToken: function ({ email, username, _id }) {
  const payload = { email, username, _id };
  return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
},
};