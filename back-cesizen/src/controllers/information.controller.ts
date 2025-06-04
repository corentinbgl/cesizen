import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getAllInformations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const infos = await prisma.information.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(infos);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getInformationBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const info = await prisma.information.findUnique({ 
      where: { slug } 
    });
    
    if (!info) {
      res.status(404).json({ message: 'Page introuvable' });
      return;
    }
    
    res.json(info);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'information:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createInformation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, content } = req.body;
    
    // Validation basique
    if (!title || !slug || !content) {
      res.status(400).json({ message: 'Tous les champs sont requis' });
      return;
    }
    
    const info = await prisma.information.create({
      data: { title, slug, content },
    });
    
    res.status(201).json(info);
  } catch (error: any) {
    console.error('Erreur lors de la création de l\'information:', error);
    
    // Gestion des erreurs de contrainte unique
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Ce slug existe déjà' });
      return;
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateInformation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, slug, content } = req.body;

    // Validation de l'ID
    const numericId = Number(id);
    if (isNaN(numericId)) {
      res.status(400).json({ message: 'ID invalide' });
      return;
    }

    const info = await prisma.information.update({
      where: { id: numericId },
      data: { title, slug, content },
    });
    
    res.json(info);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de l\'information:', error);
    
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Page non trouvée' });
      return;
    }
    
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Ce slug existe déjà' });
      return;
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteInformation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validation de l'ID
    const numericId = Number(id);
    if (isNaN(numericId)) {
      res.status(400).json({ message: 'ID invalide' });
      return;
    }

    await prisma.information.delete({ 
      where: { id: numericId } 
    });
    
    res.status(204).send();
  } catch (error: any) {
    console.error('Erreur lors de la suppression de l\'information:', error);
    
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Page non trouvée' });
      return;
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};