const express = require('express');
const router = express.Router();
const donacionController = require('../controllers/donacionController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// publica, no requiere login
router.post('/', upload.single('comprobante'), donacionController.crearDonacion);

// solo admin
router.get('/', verifyToken, authorizeRole('admin'), donacionController.obtenerDonaciones);

// cambiar estado de una donacion
router.patch('/:id', verifyToken, authorizeRole('admin'), donacionController.cambiarEstado);

module.exports = router;