const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize('postgres://localhost/acme_users_departments_test_db', {logging: false})

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
    name: nameDef,
    departmentId: UUID
})

const Department = conn.define('department', {
    id: idDef,
    name: nameDef
})

User.belongsTo(Department)
Department.hasMany(User)

const mapSeed = (data, modal) => Promise.all(data.map(item => modal.create(item)))

const syncAndSeed = async () => {
    await conn.sync({ force: true });

    const departmentNames = [{ name: 'History' }, { name: 'Math' }, { name: 'Science' }]
    const departments = await mapSeed(departmentNames, Department);

    const userNames = [
        { name: 'Effy', departmentId: departments[2].id },
        { name: 'Key', departmentId: departments[1].id },
        { name: 'Jesen', departmentId: departments[2].id },
        { name: 'Charm', departmentId: departments[1].id},
        { name: 'Haoyu', departmentId: departments[0].id }
    ];
    const users = await mapSeed(userNames, User);

    return {
        users,
        departments
    };
}

module.exports = {
    conn,
    syncAndSeed,
    models: {
        User,
        Department
    }
}
