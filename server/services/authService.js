import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import bcrypt from 'bcryptjs';
import { db } from '../db/db.js';
import 'dotenv/config';

let jwtPrivateKey, jwtPublicKey;

const loadKeys = () => {
  jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
  jwtPublicKey = process.env.JWT_PUBLIC_KEY;
}

export const generateToken = (user) => {
  loadKeys();
  const payload = { id: user.id, username: user.username, role: user.role, time: Date.now() };
  return jwt.sign(payload, jwtPrivateKey, { algorithm: 'RS256', expiresIn: '1h' });
}

const validateLogin = async (username, password) => {
  const docs = await db.getFromCollectionByFieldValue(db.USERS, 'username', username);
  if (!docs || docs.length === 0) {
    throw new Error('username not found');
  }

  const userDoc = docs[0];

  const user = User.fromUserDocument(userDoc);

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new Error('invalid password');
  }

  const token = generateToken(user);
  user.jwt = token;

  delete user.password;
  return user;
};

export { validateLogin };