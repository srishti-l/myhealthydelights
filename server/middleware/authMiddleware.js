import jwt from 'jsonwebtoken';
import 'dotenv/config';

let jwtPublicKey;

const loadKeys = () => {
  jwtPublicKey = process.env.JWT_PUBLIC_KEY;
};

export const authenticateJWT = (req, res, next) => {
  loadKeys();

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtPublicKey, { algorithms: ['RS256'] });
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: 'User role missing '});
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied'});
    }

    next();
  }
}