import express from 'express';
import migration from '../utils/migration';

const router = express.Router();

router.put('/migrations', async (req, res) => {
    await migration.runMigrations();
    res.send({ success: 'Banco Atualizado com sucesso!' });
});

export default router;
