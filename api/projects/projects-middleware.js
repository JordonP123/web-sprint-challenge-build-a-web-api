// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const proj = await Project.get(req.params.id)
        if (proj) {
            req.project = proj
            next()
        } else {
            res.status(404).json({ message: `Project ${req.params.id} not found` })
        }
    } catch (err) {
        next(err)
    }
}

async function validateProjectPost(req, res, next) {
    try {
        const { name, description } = req.body
        if (name && description) {
            next()
        } else {
            res.status(400).json({ message: "You're missing one of the required fields" })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateProjectId,
    validateProjectPost,
}