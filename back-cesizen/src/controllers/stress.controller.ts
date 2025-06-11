import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getStressEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await prisma.stressEvent.findMany({ orderBy: { points: 'desc' } });
    res.json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const calculateScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selectedIds }: { selectedIds: number[] } = req.body;
    
    if (!selectedIds || !Array.isArray(selectedIds)) {
      res.status(400).json({ message: 'IDs requis' });
      return; // Utilisez return sans valeur pour arrêter l'exécution
    }

    const events = await prisma.stressEvent.findMany({ 
      where: { id: { in: selectedIds } } 
    });
    
    const total = events.reduce((sum, e) => sum + e.points, 0);
    let level = 'Faible';
    if (total >= 150 && total < 200) level = 'Modéré';
    else if (total >= 200 && total < 300) level = 'Élevé';
    else if (total >= 300) level = 'Très élevé';

    res.json({ score: total, level });
  } catch (error) {
    console.error('Erreur lors du calcul du score:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createStressEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { label, points } = req.body;
    if (!label || typeof points !== 'number') {
      res.status(400).json({ message: 'Champs invalides' });
      return;
    }

    await prisma.stressEvent.create({ data: { label, points } });
    res.status(201).json({ message: 'Événement ajouté' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création' });
  }
};

export const deleteStressEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await prisma.stressEvent.delete({ where: { id } });
    res.json({ message: 'Événement supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};


