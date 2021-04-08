const jobUtils = require("../utils/JobUtils");
const Database = require('../db/config')

let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    daily_hours: 2,
    total_hours: 1,
    created_at: Date.now(),
  },
  {
    id: 2,
    name: "OneTwo Project",
    daily_hours: 3,
    total_hours: 47,
    created_at: Date.now()
  }
];

module.exports = {
  async get() {
    const db = await Database()

    const jobs = await db.all(`
      SELECT * FROM jobs
    `)
    await db.close()

    return jobs.map(job => {
      return {
        id: job.id,
        name: job.name,
        daily_hours: job.daily_hours,
        total_hours: job.total_hours,
        created_at: job.created_at,
      }
    });
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    await db.run(`
      UPDATE jobs SET 
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob.daily_hours},
        total_hours = ${updatedJob.total_hours}
      WHERE id = ${jobId}
    `)

    await db.close()
    // data = newJob;
  },

  async delete(id) {
    const db = await Database()

    await db.run(`
      DELETE FROM jobs WHERE id = ${id}
    `)

    await db.close()

    // data = data.filter(job => Number(job.id) !== Number(id))
  },

  async create(newJob) {
    const db = await Database()

    await db.run(`
    INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newJob.name}",
      ${newJob.daily_hours},
      ${newJob.total_hours},
      ${newJob.created_at}
    )
    `)

    await db.close()
  }
}