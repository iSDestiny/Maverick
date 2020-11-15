const Outbound = require('../model/Outbound');
const Inbound = require('../model/Inbound');

exports.getOutboundAndInbound = async (req, res, next) => {
    try {
        const inbounds = await Inbound.find();
        const outbounds = await Outbound.find();
        res.json({ inbounds: inbounds, outbounds: outbounds });
    } catch (err) {
        next(err);
    }
};
