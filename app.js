const express = require('express')
const app = express();
const { pluralize } = require('inflection')
const db = require('./db')

Object.entries(db.conn.models).forEach(([name, model]) => {
    const baseRoute = `/api/${pluralize(name)}`

    app.get(baseRoute, (req, res, next) => {
        model.findAll()
            .then( items => res.send(items) )
            .catch(next)
    })
})

module.exports = app
