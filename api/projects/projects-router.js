// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const { validateProjectId, validateProjectPost } = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res) => {
    Project.get()
        .then(proj => {
            res.json(proj)
        }).catch(err => { //eslint-disable-line
            res.status(500).json({ message: 'Could not get Projects' })
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.get('/:id/actions', validateProjectId, async (req, res) => {
    try {
        const getActions = await Project.getProjectActions(req.params.id)
        res.json(getActions)
    } catch {
        res.status(500).json({ message: 'Could not get Projects Actions' })
    }
})

router.post('/', validateProjectPost, async (req, res) => {
    try {
        const postProj = await Project.insert(req.body)
        res.status(201).json(postProj)
    } catch (err) {
        res.status(500).json({ message: 'Could not post Project' })
    }
})

router.put('/:id', validateProjectId, validateProjectPost, async (req, res) => {
    try {
        const updateProj = await Project.update(req.params.id, req.body)
        if (req.body.completed !== undefined) {
            res.status(201).json(updateProj)
        } else {
            res.status(400).json({ message: "You are missing a required field" })
        }
    } catch {
        res.status(500).json({ message: 'Could not update Project' })

    }
})

router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        const deleteProj = await Project.remove(req.params.id)
        res.json(deleteProj)
    } catch {
        res.status(500).json({ message: "Could not delete the post" })
    }
})

module.exports = router