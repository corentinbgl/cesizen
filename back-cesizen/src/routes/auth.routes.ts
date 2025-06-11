import { Router } from 'express';
import { register, login, updatePassword, deleteAccount, createUserByAdmin, getAllUsers, updateUserRole, deleteUser } from '../controllers/auth.controller';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update-password', authenticateToken ,updatePassword);
router.delete('/delete-account', authenticateToken, deleteAccount)
router.post('/admin/create-user',authenticateToken, isAdmin, createUserByAdmin )
router.get('/admin/users', authenticateToken, isAdmin, getAllUsers)
router.put('/admin/users/role', authenticateToken, isAdmin, updateUserRole);
router.delete('/admin/users/:userId', authenticateToken, isAdmin, deleteUser)

export default router;
