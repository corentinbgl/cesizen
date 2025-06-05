// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Non authentifié' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
//     req.user = decoded; // @ts-ignore
//     next();
//   } catch {
//     res.status(401).json({ message: 'Token invalide' });
//   }
// }

// export function isAdmin(req: Request, res: Response, next: NextFunction) {
//   // @ts-ignore
//   if (req.user?.role !== 'admin') {
//     return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
//   }
//   next();
// }
