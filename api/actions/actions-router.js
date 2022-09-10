const express = require('express')
const Action = require('./actions-model')
const router = express.Router()
const { validateActionId, validateActionPost } = require('./actions-middlware')

router.get('/', async (req, res) => {
    try {
        const getActions = await Action.get()
        res.json(getActions)
    } catch {
        res.status(500).json({ message: 'Could not get actions' })
    }
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateActionPost, async(req,res) => {
    try{
        const postAction = await Action.insert(req.body)
        res.status(201).json(postAction)
    } catch(err){
        res.status(500).json({ message: 'can not post an action' })
    }
})

router.put('/:id', validateActionId, validateActionPost, async(req, res) => {
    try{
        const updateAction = await Action.update(req.params.id, req.body)
        if(req.body.completed){
            res.json(updateAction)
        } else {
        res.status(400).json({ message: "missing one of the required fields" })
        }
    } catch {
        res.status(500).json({ message: 'can not update action' })
    }
})

router.delete('/:id', validateActionId, async(req, res) => {
    try{
        const deleteAction = await Action.remove(req.params.id)
        res.json(deleteAction)
    } catch {
        res.status(500).json({ message: 'can not delete action' })

    }   
})


module.exports = router