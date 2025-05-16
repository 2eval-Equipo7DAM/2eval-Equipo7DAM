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
                expect(res.body).to.have.property('year');
                done();
            });
    });

    it('should fail to create a gpu with missing fields', (done) => {
        chai.request(app)
            .post('/gpu')
            .send({ 
                brand: '', 
                model: 'RTX 4080',
                vram: 16
            }) // Falta el campo price y la brand está vacía
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body).to.have.property('brand and price must be filled'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});

describe('PUT /gpu/:id', () => {
    it('should update a gpu (success)', (done) => {
        chai.request(app)
            .put('/gpu/24')
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
                expect(res).to.have.status(400); // Espera error 404 (no encontrado)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body).to.have.property('Videogame not found'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});

describe('DELETE /gpu/:id', () => {
    it('should delete a GPU (success)', (done) => {
        chai.request(app)
            .delete('/gpu/24')
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
                expect(res).to.have.status(404); // Espera error 404
                expect(res.body.status).to.equal('bad-request');
                expect(res.body).to.have.property('GPU not found'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});
