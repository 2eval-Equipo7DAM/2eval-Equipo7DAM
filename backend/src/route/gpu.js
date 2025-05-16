const express = require('express');
const { getGpu,getGpuByName, postGpu, putGpu, deleteGpu } = require('../controller/gpu');
const router = express.Router();

router.get('/gpu', getGpu);
// router.get('/gpu/:gpu', getGpuByName);
router.post('/gpu', postGpu);
router.put('/gpu/:gpuId', putGpu);
router.delete('/gpu/:gpuId', deleteGpu);

module.exports = router;