const express = require('express')
const app = express();
const { pluralize } = require('inflection')
const db = require('./db');

app.use(express.json());
app.use(require('cors')());

const PORT = process.env.PORT || 3000;

db.syncAndSeed()
    .then(() => {
        app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
    })

Object.entries(db.conn.models).forEach(([name, model]) => {
    const baseRoute = `/api/${pluralize(name)}`

    app.get(baseRoute, (req, res, next) => {
        model.findAll()
            .then( items => res.send(items) )
            .catch(next)
    })

    app.post(baseRoute, (req, res, next) => {
        model.create(req.body)
            .then( item => res.status(201).send(item) )
            .catch(next)
    })

    app.put(`${baseRoute}/:id`, (req, res, next) => {
        model.findByPk(req.params.id)
            .then(item => item.update(req.body))
            .then(item => res.send(item))
            .catch(next)
    })

    app.delete(`${baseRoute}/:id`, (req, res, next) => {
        model.findByPk(req.params.id)
            .then(item => item.destroy())
            .then(() => res.sendStatus(204))
            .catch(next)
    })
})




module.exports = app
