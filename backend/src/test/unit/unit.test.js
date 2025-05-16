const expect = require('chai').expect;
const knex = require('knex');
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'hardware.db'
    },
    useNullAsDefault: true
});


    // Unit tests for gpu data fields
    describe('GPU data fields', () => {
        it('should validate GPU brand is a non-empty string', () => {
            const gpu = { brand: 'Gigabyte' };
            expect(gpu.brand).to.be.a('string');
            expect(gpu.brand.length).to.be.greaterThan(0);
        });

        it('should validate GPU type is a valid string', () => {
            const gpu = { model: 'rtx 5000' };
            expect(gpu.model).to.be.a('string');
            expect(['rtx 5000', 'rtx 4000', 'rtx 3000', 'rtx 2000']).to.include(gpu.model);
        });

        it('should validate GPU price is a valid number', () => {
            const gpu = { price: 1800 };
            expect(gpu.price).to.be.a('number');
        });
    });

    // Unit tests for gpu data retrieval
    describe('gpu data retrieval', () => {
        it('should retrieve a gpu by Brand', async () => {
            const brand = 'ZOTAC';
            const response = await db('gpu').select('*').where({ brand }).first();
            expect(response).to.have.property('brand', brand);
        });  
        afterAll(async () => {
    await db.destroy();
    });
});
