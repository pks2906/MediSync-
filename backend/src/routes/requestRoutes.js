import express from 'express';
import { createRequest } from '../controllers/requestController.js';

const router = express.Router();

router.post('/requests', createRequest);
router.get('/requests', getAllRequests);
router.put('/requests/:id', updateRequestStatus);

export default router;
