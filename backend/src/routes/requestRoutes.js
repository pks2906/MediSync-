import express from 'express';
import {
  createRequest,
  getAllRequests,
  updateRequestStatus
} from '../controllers/requestController.js';

const router = express.Router();

router.post('/requests', createRequest);
router.get('/requests', getAllRequests);
router.put('/requests/:id', updateRequestStatus);

export default router;
