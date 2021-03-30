const express = require('express');
const routes = express.Router()


// basePath -- definie caminho base usando constante __dirname
const views = __dirname + "/views/"

// objeto para o profile
const profile = {
  name: "Leonardo Carvalho",
  avatar: "https://github.com/leonardo-mdc.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
}

// geras rotas
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
  console.log('salvar dados')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes;