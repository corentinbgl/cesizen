import { getStressEvents, calculateScore, createStressEvent, deleteStressEvent } from './stress.controller';
import prisma from '../utils/prisma';

jest.mock('../utils/prisma', () => ({
  stressEvent: {
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
  }
}));

describe('Stress Controller', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getStressEvents - should return events ordered by points desc', async () => {
    const res = mockRes();
    const events = [{ id: 1, points: 100 }];
    (prisma.stressEvent.findMany as jest.Mock).mockResolvedValue(events);

    await getStressEvents({} as any, res);
    expect(res.json).toHaveBeenCalledWith(events);
  });

  it('calculateScore - should return correct score and level', async () => {
    const req = { body: { selectedIds: [1, 2] } } as any;
    const res = mockRes();
    const events = [{ id: 1, points: 100 }, { id: 2, points: 120 }];
    (prisma.stressEvent.findMany as jest.Mock).mockResolvedValue(events);

    await calculateScore(req, res);
    expect(res.json).toHaveBeenCalledWith({ score: 220, level: 'Élevé' });
  });

  it('calculateScore - should return 400 if selectedIds invalid', async () => {
    const req = { body: { selectedIds: null } } as any;
    const res = mockRes();

    await calculateScore(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'IDs requis' });
  });

  it('createStressEvent - should return 201 if valid data', async () => {
    const req = { body: { label: 'Test', points: 100 } } as any;
    const res = mockRes();

    await createStressEvent(req, res);
    expect(prisma.stressEvent.create).toHaveBeenCalledWith({ data: { label: 'Test', points: 100 } });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Événement ajouté" });
  });

  it('createStressEvent - should return 400 if missing label or points', async () => {
    const req = { body: {} } as any;
    const res = mockRes();

    await createStressEvent(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Champs invalides' });
  });

  it('deleteStressEvent - should delete event and return success', async () => {
    const req = { params: { id: '1' } } as any;
    const res = mockRes();

    await deleteStressEvent(req, res);
    expect(prisma.stressEvent.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Événement supprimé' });
  });
});
