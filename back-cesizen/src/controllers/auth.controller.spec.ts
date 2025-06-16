import { register, login, updatePassword, deleteAccount, createUserByAdmin, getAllUsers, updateUserRole, deleteUser } from './auth.controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../utils/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn()
  }
}));

describe('Auth Controller', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('register - should create new user', async () => {
    const req = { body: { email: 'test@example.com', password: '123456' } } as any;
    const res = mockRes();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: 1 });

    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Compte créé avec succès', id: 1 });
  });

  it('register - should return error if email exists', async () => {
    const req = { body: { email: 'test@example.com', password: '123456' } } as any;
    const res = mockRes();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({});

    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email déjà utilisé' });
  });

  it('login - should return token if credentials valid', async () => {
    const req = { body: { email: 'test@example.com', password: '123456' } } as any;
    const res = mockRes();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ email: 'test@example.com', password: 'hashed', id: 1, role: 'user' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('token123');

    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur serveur' });
  });

  it('login - should return 404 if user not found', async () => {
    const req = { body: { email: 'test@example.com', password: '123456' } } as any;
    const res = mockRes();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur non trouvé' });
  });

  it('login - should return 401 if password invalid', async () => {
    const req = { body: { email: 'test@example.com', password: 'wrong' } } as any;
    const res = mockRes();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ password: 'hashed' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Mot de passe incorrect' });
  });

  it('updatePassword - should update the password', async () => {
    const req = { body: { newPassword: 'new' }, user: { id: 1 } } as any;
    const res = mockRes();

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

    await updatePassword(req, res);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { password: 'hashed' } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Mot de passe mis à jour avec succès' });
  });

  it('deleteAccount - should delete the user', async () => {
    const req = { user: { id: 1 } } as any;
    const res = mockRes();

    await deleteAccount(req, res);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Compte supprimé avec succès' });
  });

  it('createUserByAdmin - should create new user', async () => {
    const req = { body: { email: 'new@example.com', password: '123456', role: 'admin' } } as any;
    const res = mockRes();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

    await createUserByAdmin(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la création' });
  });

  it('getAllUsers - should return users list', async () => {
    const req = {} as any;
    const res = mockRes();
    const users = [{ id: 1, email: 'a', role: 'user' }];

    (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

    await getAllUsers(req, res);
    expect(res.json).toHaveBeenCalledWith(users);
  });


  it('deleteUser - should delete user by id', async () => {
    const req = { params: { userId: '1' } } as any;
    const res = mockRes();

    await deleteUser(req, res);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur supprimé' });
  });
});
