import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token manquant' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token invalide' });
    return;
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;
  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    return; // return sans valeur
  }
  next();
};
