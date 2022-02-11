const router = require('express').Router();
const apiRoutes = require('./api/apiRoutes')
const path = require('path')

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '.././public/notes.html'))
})

router.use('/api/notes', apiRoutes);

module.exports = router;