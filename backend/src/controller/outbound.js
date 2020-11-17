const io = require('../socket');
const Outbound = require('../model/Outbound');

exports.getOutbound = async (req, res, next) => {
    try {
        const outbounds = await Outbound.find();
        res.json(outbounds);
    } catch (err) {
        next(err);
    }
};

exports.postOutbound = async (req, res, next) => {
    try {
        const { amzl, door } = req.body;
        const outbound = new Outbound({
            amzl: amzl.trim(),
            door: door.trim()
        });
        await outbound.save();
        io.getIO().emit('outbound', {
            action: 'create',
            outbound: outbound
        });
        res.status(201).json({ outbound: outbound });
    } catch (err) {
        next(err);
    }
};

exports.putOutbound = async (req, res, next) => {
    try {
        const { id, amzl, door } = req.body;
        const outbound = await Outbound.findById(id);
        if (!outbound) throw new Error('Outbound does not exist');
        outbound.amzl = amzl;
        outbound.door = door;
        await outbound.save();
        io.getIO().emit('outbound', { action: 'modify', outbound: outbound });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

exports.deleteOutbound = async (req, res, next) => {
    try {
        const { id } = req.params;
        const outbound = await Outbound.findByIdAndDelete(id);
        if (!outbound) throw new Error('Outbound does not exist!');
        io.getIO().emit('outbound', { action: 'delete', outbound: outbound });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};
