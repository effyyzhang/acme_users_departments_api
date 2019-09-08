const { expect } = require('chai');
const supertest = require('supertest');
const app = supertest(require('./app'));
const db = require('./db');

describe('API for USERS', () => {
    describe('GET /api/users', () => {
        it('return 5 users', () => {
            return app.get('/api/users')
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.equal(5);
                })
        })
    })
})

describe('DATABASE', () => {
    let seed;
    beforeEach(async () => seed = await db.syncAndSeed());
    describe('Users Table', () => {
        it('Users table must have 5 existing users.', () => {
            expect(seed.users.length).to.equal(5);
        })
        it('Effy, Key, Jesen, Charm, Haoyu are users.', () => {
            expect(seed.users[0].name).to.equal('Effy');
            expect(seed.users[1].name).to.equal('Key');
            expect(seed.users[2].name).to.equal('Jesen');
            expect(seed.users[3].name).to.equal('Charm');
            expect(seed.users[4].name).to.equal('Haoyu');
        });
        it('A user must have a departments', () => {
            seed.users.forEach(user => {
                expect(user.departmentId).to.exist;
            })
        })
    })
    describe('Departments Table', () => {
        it('Departments table must have 3 existing departments.', () => {
            expect(seed.departments.length).to.equal(3);
        })
        it('History, Math, Science are departments.', () => {
            expect(seed.departments[0].name).to.equal('History');
            expect(seed.departments[1].name).to.equal('Math');
            expect(seed.departments[2].name).to.equal('Science');
        })
    })
})