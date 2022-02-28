const express = require('express')
const passport = require('passport')
const discussion = require('../controllers/discussion.controller')
const router = express.Router()


router.get('/discussion/:id', discussion.getOneDiscussion)
router.get('/discussions', discussion.getAllDiscussion)

router.post('/discussion', passport.authenticate('jwt', {session: false}), discussion.createDiscussion)

router.post('/do-comment/:id', passport.authenticate('jwt', {session: false}), discussion.doComment)
router.post('/do-reply/:id', passport.authenticate('jwt', {session: false}), discussion.doReply)


module.exports = router