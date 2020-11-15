const express = require('express');
const router = express.Router();
const {
    postOutbound,
    putOutbound,
    deleteOutbound
} = require('../controller/outbound');

const {
    postInbound,
    putInbound,
    deleteInbound
} = require('../controller/inbound');

router.post('/outbound', postOutbound);
router.put('/outbound', putOutbound);
router.delete('/outbound/:id', deleteOutbound);
router.post('/inbound', postInbound);
router.put('/inbound', putInbound);
router.delete('/inbound/:id', deleteInbound);

module.exports = router;
