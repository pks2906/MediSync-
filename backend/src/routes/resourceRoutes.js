import express from 'express';
import { addResource, getAllResources } from '../controllers/resourceController.js';

const router = express.Router();

router.post('/resources', addResource);
router.get('/resources', getAllResources);


export default router;
