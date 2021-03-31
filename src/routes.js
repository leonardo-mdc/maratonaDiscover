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
  "vacation-per-year": 4,
  "value-hour": 75
}

const Job = {
  controllers: {
    index(req, ress) {},
  }
}

const jobs = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    createdAt: Date.now()
  },
  {
    id: 3,
    name: "Jobomas",
    "daily-hours": 8,
    "total-hours": 47,
    createdAt: Date.now()
  }
]

function remainingDays(job) {
      // ajustes no job
      // cálculo de tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
  
      const createdDate = new Date(job.createdAt)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDateInMs - Date.now()
      // transformar milli em dias
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
      // restam x dias
      return dayDiff
}
  
// gera rotas
routes.get('/', (req, res) => {

  const updatedJobs = jobs.map((job) => {
    //ajustes no job
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'

    return {
      ...job,
      remaining,
      status,
      budget: profile["value-hour"] * job["total-hours"]
    }
  })

  
  return res.render(views + "index", { jobs: updatedJobs })
})


routes.get('/job', (req, res) => res.render(views + "job"))

routes.post('/job', (req, res) => {
  // { name: 'Leonardo Carvalho', 'daily-hours': '11', 'total-hours': '11111' }

  const lastId = jobs[jobs.length - 1]?.id || 1;
  
  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    created_at: Date.now() // data de hoje
  })

  return res.redirect('/')
})

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes;