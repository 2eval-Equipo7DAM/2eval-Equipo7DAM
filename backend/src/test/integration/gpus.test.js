const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();


describe('GET /gpu', () => {
    it('should return all gpus', (done) => { 
        chai.request(app)
            .get('/gpu')
            .end((err, res) => {
                expect(res).to.have.status(200); // Espera éxito
                expect(res.body).to.be.an('array'); // El cuerpo de la respuesta es un array
                expect(res.body.length).to.be.greaterThan(0); // Hay al menos una gpu
                done();
            });
    });
});

describe('POST /gpu', () => {
    it('should create a new gpu (success)', (done) =>  {
        chai.request(app)
            .post('/gpu')
            .send({ 
                brand: 'ASUS',
                model: 'RTX 4090', 
                vram: 24,
                price: 1650
                })
            .end((err, res) => {
                expect(res).to.have.status(201); // Espera que la respuesta sea 201 (creado)
                expect(res.body).to.have.property('brand');
                expect(res.body).to.have.property('model');
                expect(res.body).to.have.property('vram'); // El objeto devuelto tiene el nombre correcto
                expect(res.body).to.have.property('price');
                done();
            });
    });

    it('should fail to create a gpu with missing brand', (done) => {
        chai.request(app)
            .post('/gpu')
            .send({ 
                brand: '', 
                model: 'RTX 4080',
                vram: 16,
                price: 1200
            })
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body.message).to.equal('Brand of gpu is obligatory'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });

    it('should fail to create a gpu with missing model', (done) => {
        chai.request(app)
            .post('/gpu')
            .send({ 
                brand: 'AORUS', 
                model: '',
                vram: 16,
                price: 700
            }) 
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body.message).to.equal('Model is necessary'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });

    it('should fail to create a gpu with missing vram', (done) => {
        chai.request(app)
            .post('/gpu')
            .send({ 
                brand: 'AORUS', 
                model: 'RTX 4070',
                vram: '',
                price: 700
            }) 
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body.message).to.equal('VRAM is necessary'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });

    it('should fail to create a gpu with missing price', (done) => {
        chai.request(app)
            .post('/gpu')
            .send({ 
                brand: 'AORUS', 
                model: 'RTX 4070',
                vram: 16,
                price: ''
            }) 
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body.message).to.equal('Price is necessary'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});

describe('PUT /gpu/:id', () => {
    it('should update a gpu (success)', (done) => {
        chai.request(app)
            .put('/gpu/30')
            .send({ 
                brand: 'Updated GPU',
                model: 'RTX UPDATED', 
                vram: 16,
                price: 800
            })
            .end((err, res) => {
                expect(res).to.have.status(200); // Espera éxito
                expect(res.body).to.have.property('brand');
                expect(res.body).to.have.property('model');
                expect(res.body).to.have.property('vram');
                expect(res.body).to.have.property('price');
                done();
            });
    });

    it('should fail to update a non-existent gpu', (done) => {
        chai.request(app)
            .put('/gpu/9999') // ID que no existe
            .send({ 
                brand: 'NO-GPU',
                model: 'NO-MODEL', 
                vram: 0,
                price: 0
            })
            .end((err, res) => {
                expect(res).to.have.status(404); // Espera error 404 (no encontrado)
                expect(res.body.error).to.equal('GPU not found'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});

describe('DELETE /gpu/:id', () => {
    it('should delete a GPU (success)', (done) => {
        chai.request(app)
            .delete('/gpu/53')
            .end((err, res) => {
                expect(res).to.have.status(200); // Espera éxito
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it('should fail to delete a non-existent GPU', (done) => {
        chai.request(app)
            .delete('/gpu/9999') // ID que no existe
            .end((err, res) => {
                expect(res).to.have.status(404); // Espera error 404 (no encontrado)
                expect(res.body.error).to.equal('GPU not found'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});
