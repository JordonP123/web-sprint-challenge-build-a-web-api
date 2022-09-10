const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const getActionById =  await Action.get(req.params.id)
        if (getActionById) {
            req.action = getActionById
            next()
        } else {
            res.status(404).json({
                message: `Could not find action with id ${req.params.id}`
            })
        }
    } catch (err) {
        next(err)
    }
}

function validateActionPost(req, res, next){
    const { project_id, description, notes } = req.body
    if(description && notes && project_id){
        next()
    } else {
        res.status(400).json({ message: "missing one of the required fields" })
    }
}

module.exports = {
    validateActionId,
    validateActionPost
}
