import express from 'express';
import project from './project';
import report from './report';

const router = express.Router();

router.use('/project', project);
router.use('/report', report);

export default router;
