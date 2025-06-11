import { getAllInformations, getInformationBySlug, createInformation, updateInformation, deleteInformation } from './information.controller';
import prisma from '../utils/prisma';

jest.mock('../utils/prisma', () => ({
  information: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

describe('Information Controller', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllInformations - should return infos ordered by createdAt desc', async () => {
    const res = mockRes();
    const infos = [{ id: 1, title: 'Info' }];
    (prisma.information.findMany as jest.Mock).mockResolvedValue(infos);

    await getAllInformations({} as any, res);
    expect(res.json).toHaveBeenCalledWith(infos);
  });

  it('getInformationBySlug - should return info if found', async () => {
    const req = { params: { slug: 'example-slug' } } as any;
    const res = mockRes();
    const info = { id: 1, slug: 'example-slug', title: 'Info' };

    (prisma.information.findUnique as jest.Mock).mockResolvedValue(info);
    await getInformationBySlug(req, res);
    expect(res.json).toHaveBeenCalledWith(info);
  });

  it('getInformationBySlug - should return 404 if not found', async () => {
    const req = { params: { slug: 'unknown-slug' } } as any;
    const res = mockRes();
    (prisma.information.findUnique as jest.Mock).mockResolvedValue(null);

    await getInformationBySlug(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Page introuvable' });
  });

  it('createInformation - should create and return new info', async () => {
    const req = { body: { title: 'New', slug: 'new', content: 'Contenu' } } as any;
    const res = mockRes();
    const info = { id: 1, ...req.body };
    (prisma.information.create as jest.Mock).mockResolvedValue(info);

    await createInformation(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(info);
  });

  it('createInformation - should return 400 if missing fields', async () => {
    const req = { body: {} } as any;
    const res = mockRes();

    await createInformation(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Tous les champs sont requis' });
  });

  it('updateInformation - should update and return info', async () => {
    const req = { params: { id: '1' }, body: { title: 'Titre', slug: 'slug', content: 'Texte' } } as any;
    const res = mockRes();
    const info = { id: 1, ...req.body };
    (prisma.information.update as jest.Mock).mockResolvedValue(info);

    await updateInformation(req, res);
    expect(res.json).toHaveBeenCalledWith(info);
  });

  it('updateInformation - should return 400 if id is invalid', async () => {
    const req = { params: { id: 'abc' }, body: {} } as any;
    const res = mockRes();

    await updateInformation(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'ID invalide' });
  });

  it('deleteInformation - should delete info and return 204', async () => {
    const req = { params: { id: '1' } } as any;
    const res = mockRes();

    await deleteInformation(req, res);
    expect(prisma.information.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('deleteInformation - should return 400 if id is invalid', async () => {
    const req = { params: { id: 'abc' } } as any;
    const res = mockRes();

    await deleteInformation(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'ID invalide' });
  });
});
