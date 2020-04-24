const supertest = require('supertest');

const server = require('../api/server.js');
const db = require('../database/dbconfig.js');

describe('server can retrieve list', function() {
    describe('get /anime', function() {
        it('should return status 200', function () {
            return supertest(server)
                .get('/api/anime')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
});

describe('endpoint has no entries', function() {
    describe('get /anime', function() {
        beforeEach(async () => {
            await db('anime').truncate();
        })
        it('should have length of 0', function () {
            return supertest(server)
                .get('/api/anime')
                .then(res => {
                    expect(res.body.length).toBe(0);
                });
        });
    });
    
    describe('post anime', function() {
        it('returns 201 on success', function() {
            return supertest(server)
                .post('/api/anime')
                .send({title: 'Ajin', producer: 'Katsuyuki Motohiro', description: 'sci-fi/action/thriller'})
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
        it('has length of 2', async function() {
            await supertest(server)
                .post('/api/anime')
                .send({title: 'Berserk', producer: 'producer', description: 'some description'})
                .then(res => {
                    expect(res.body.message).toBe('anime successfully added');
                });
        });
    })
    describe('delete anime', function() {
        it('returns 200', function() {
            return supertest(server)
                .delete('/api/anime/2')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it('returns 404', function() {
            return supertest(server)
                .delete('/api/anime/2')
                .then(res => {
                    expect(res.status).toBe(404)
                })
        })
    });

});