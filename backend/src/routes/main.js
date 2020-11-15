const express = require('express');
const { getInbound } = require('../controller/inbound');
const { getOutboundAndInbound } = require('../controller/joint');
const { getOutbound } = require('../controller/outbound');
const router = express.Router();

router.get('/outbound', getOutbound);
router.get('/inbound', getInbound);
router.get('/main', getOutboundAndInbound);

module.exports = router;
