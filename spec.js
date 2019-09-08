const {expect} = require('chai');
const supertest = require('supertest');
const app =supertest(require('./app'));
const {pluralize} = require('inflection');
const db = require('./db');

describe('users API', ()=> {
    describe('GET /api/users', ()=>{
        xit('return 5 users', ()=>{
            return app.get('/api/users')
            .expect(200)
            .then( response => {
                expect(response.body.length).to.equal(5);
            })
        })
    })
})

describe('database', ()=>{
    let seed;
    beforeEach(async()=> seed = await db.syncAndSeed());
    describe('Users', ()=>{
        it('Effy, Key, Jesen, Charm, Haoyu are users ', ()=>{
            expect(seed.users[0].name).to.equal('Effy');
            expect(seed.users[1].name).to.equal('Key');
            expect(seed.users[2].name).to.equal('Jesen');
            expect(seed.users[3].name).to.equal('Charm');
            expect(seed.users[4].name).to.equal('Haoyu');
        });
    })
})


