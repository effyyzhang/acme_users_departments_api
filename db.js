const Sequelize = require('sequelize');
const {UUID, UUIDV4, STRING} = Sequelize;
const conn = new Sequelize('postgres://localhost/acme_users_departments_test_db')

// const conn = new Sequelize(process.env.DATABASE_URL)


const idDef = {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
}

const nameDef = {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
        notEmpty: true
    }
}

const User = conn.define('user', {
    id: idDef,
    name: nameDef
})

const mapSeed = (data, modal) => Promise.all(data.map( item => modal.create(item)))

const syncAndSeed = async() => {
    await conn.sync({force: true});
    console.log('URL', process.env.DATABASE_URL)
    const userNames = [{name: 'Effy'}, {name: 'Key'}, {name: 'Jesen'}, {name: 'Charm'}, {name: 'Haoyu'}];
    const users = await mapSeed(userNames, User);
    return {users};
    
    
}

module.exports = {
    syncAndSeed,
    models:{
        User
    }
}