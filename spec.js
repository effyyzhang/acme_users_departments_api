const { expect } = require('chai');
const supertest = require('supertest');
const app = supertest(require('./app'));
const db = require('./db');
const {Department, User} = db.models;

describe('API for USERS', () => {
    let seed;
    beforeEach(async () => seed = await db.syncAndSeed());
    describe('GET /api/users', () => {
        it('return 5 users', () => {
            return app.get('/api/users')
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.equal(5);
                })
        })
    })

    describe('POST /api/users', () => {
        it('return an new user', () => {
            return app.post(`/api/users`)
                .send({name:'Mike', departmentId:seed.departments[0].id})
                .expect(201)
                .then(response => {
                    expect(response.body.name).to.equal('Mike');
                    expect(response.body.departmentId).to.equal(seed.departments[0].id);
                });
        })
    })

    describe('PUT /api/users/:id', () => {
        it('return an updated user', () => {
            return app.put (`/api/users/${seed.users[0].id}`)
                .send({name:'Mike'})
                .expect(200)
                .then(response => {
                    expect(response.body.name).to.equal('Mike');
                });
        })
    })

    describe('DELETE /api/users/:id', () => {
        it('Delete a user', () => {
            return app.delete(`/api/users/${seed.users[0].id}`)
                .expect(204);
        })
    })
})


describe('API for Departments', () => {
    let seed;
    beforeEach(async () => seed = await db.syncAndSeed());
    describe('GET /api/departments', () => {
        it('return 3 departments', () => {
            return app.get('/api/departments')
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.equal(3);
                })
        })
    })

    describe('POST /api/departments', () => {
        it('return an new department', () => {
            return app.post(`/api/departments`)
                .send({name:'Music'})
                .expect(201)
                .then(response => {
                    expect(response.body.name).to.equal('Music');
                });
        })
    })

    describe('PUT /api/departments/:id', () => {
        it('return an updated department', () => {
            return app.put (`/api/departments/${seed.departments[0].id}`)
                .send({name:'IT'})
                .expect(200)
                .then(response => {
                    expect(response.body.name).to.equal('IT');
                });
        })
    })

    describe('DELETE /api/departments/:id', () => {
        it('Delete a department', () => {
            return app.delete(`/api/departments/${seed.departments[0].id}`)
                .expect(204);
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
