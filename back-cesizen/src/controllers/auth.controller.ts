import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ message: 'Email déjà utilisé' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashed }
    });

    res.status(201).json({ message: 'Compte créé avec succès', id: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ message: 'Mot de passe incorrect' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env['JWT_SECRET'] || 'secret', {
      expiresIn: '1h',
    });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {

    const userId = (req as any).user.id;
    const { newPassword } = req.body;


    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed }
    })

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error){
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export const deleteAccount = async (req:Request, res:Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    await prisma.user.delete({
      where: { id: userId }
    });

    res.json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export const createUserByAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ message: 'Email déjà utilisé' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed, role }
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role } = req.body;

    await prisma.user.update({
      where: { id: userId },
      data: { role }
    });

    res.json({ message: 'Rôle mis à jour' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    await prisma.user.delete({
      where: { id: Number(userId) }
    });

    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};




