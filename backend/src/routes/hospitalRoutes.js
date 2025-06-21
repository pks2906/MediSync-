import express from 'express';
import { registerHospital, getAllHospitals } from '../controllers/hospitalController.js';

const router = express.Router();

router.post('/hospitals', registerHospital);
router.get('/hospitals', getAllHospitals);

export default router;
