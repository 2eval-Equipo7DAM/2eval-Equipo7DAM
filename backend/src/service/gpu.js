const knex = require('knex');

/* const db = knex ({
    client: 'sqlite3',
    connection: {
        filename: 'hardware.db'                    
    },
    useNullAsDefault: true
}); */

    const db = knex ({
     client: ',mysql',
    connection: {
        host:'localhost',
        port: 3306, 
        user:'user',
        password: "password",
        database: 'hardware.db'                
    },
    useNullAsDefault: true
});

const findGpu = (async () => {
    const gpus = await db('gpu').select('*');

    return gpus;
});

const findGpuByName = (async (name) => {
  const result = await db('gpu').select('*').where({name: name}).first();

  return result;
});

const findGpuById = (async (id) => {
   const gpu = await db('gpu').select('*').where({ id }).first();
   return gpu;
});

const registerGpu = (async (brand, model, vram, price) => { 
   const [id] = await db('gpu').insert({ brand, model, vram, price });
    return await db('gpu').where({ id }).first();
});

const modifyGpu = async (id, brand, model, vram, price ) => {
    const updated = await db('gpu').where({ id }).update({ brand, model, vram, price });
    return updated;
};

const removeGpu = async (id) => {
    const deleted = await db('gpu').where({ id }).del();
    return deleted;
};


module.exports = {
    findGpu,
    findGpuByName,
    findGpuById,
    registerGpu,
    modifyGpu,
    removeGpu
};