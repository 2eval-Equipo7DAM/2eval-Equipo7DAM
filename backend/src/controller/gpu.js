const { findGpu, findGpuByName, findGpuById, registerGpu, modifyGpu, removeGpu } = require("../service/gpu");

const getGpu = async (req, res) => {
   const gpus = await findGpu();
   res.status(200).json(gpus);
};

const getGpuByName = async (req, res) => {
    const gpu = await findGpuByName(req.params.gpu);

    if (videogame === undefined){
        res.status(404).json({
            status: 'not-found',
            message: 'GPU not found'
        });
        return;
    }

    res.status(200).json(gpu);
};

 const postGpu = async (req, res) => {
     if (req.body.brand === undefined || req.body.brand === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'Brand of gpu is obligatory'
        });
        return;
    }

    if (req.body.model === undefined || req.body.model === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'Model is necessary'
        });
        return;
    }

     if (req.body.price <= 0) {
        res.status(400).json({
            status: 'bad-request',
            message: 'Price is necessary'
        });
        return;
    } 

    if (req.body.vram === undefined || req.body.vram === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'VRAM is necessary'
        });
        return;
        }
    const newGpu = await registerGpu(req.body.brand, req.body.model, req.body.vram, req.body.price);
    res.status(201).json(newGpu);
};

const putGpu = async (req, res) => {
    const updated = await modifyGpu(
        req.params.gpuId, // <-- PASA EL ID AQUÍ
        req.body.brand,
        req.body.model,
        req.body.price,
        req.body.vram
    );
    if (updated) {
        // Busca el videojuego actualizado por id
        const updatedGpu = await findGpuById(req.params.gpuId);
        res.status(200).json(updatedGpu);
    } else {
        res.status(404).json({ error: 'GPU not found' });
    }
};
const deleteGpu = async (req, res) => {
    const deleted = await removeGpu(req.params.gpuId);
   if (deleted) {
            res.status(200).json({ message: 'GPU deleted' });
        } else {
            res.status(404).json({ error: 'GPU not found' });
        }
};

module.exports = {
    getGpu, 
    getGpuByName,
    postGpu,
    putGpu,
    deleteGpu
};