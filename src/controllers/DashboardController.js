const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {

    /*
    pode ser tb
    const updatedJobs = Jobs.get().map((job) => {
    */

    const jobs = await Job.get()
    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas por dia dos projetos em progresso
    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
      // ajustes no job
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      // status = done
      // statusCount[done] += 1
      // somando a quantidade de status
      statusCount[status] += 1;

      // somando 1 a cada status
      /*
      if (status === 'progress') {
        jobTotalHours += Number(job.daily_hours)
      }
      */
      jobTotalHours += status === 'progress' ? Number(job.daily_hours) : 0

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile.value_hour)
      }
    })

    // quantidade de horas/dia que quero trabalhar 
    // MENOS
    // quantidade de horas/dia por projeto (progress)
    const freeHours = profile.hours_per_day - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours
    })

  }

}