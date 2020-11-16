const io = require('../socket');
const Inbound = require('../model/Inbound');

exports.getInbound = (req, res, next) => {
    try {
        const inbounds = Inbound.find();
        res.json(inbounds);
    } catch (err) {
        next(err);
    }
};

exports.postInbound = async (req, res, next) => {
    try {
        const { door } = req.body;
        const inbound = new Inbound({
            door: door.trim()
        });
        await inbound.save();
        io.getIO().emit('inbound', {
            action: 'create',
            inbound: inbound
        });
        res.status(201).json({ inbound: inbound });
    } catch (err) {
        next(err);
    }
};

exports.putInbound = async (req, res, next) => {
    try {
        const { id, door } = req.body;
        const inbound = await Inbound.findById(id);
        if (!inbound) throw new Error('Inbound does not exist');
        inbound.door = door;
        await inbound.save();
        io.getIO().emit('inbound', { action: 'modify', inbound: inbound });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

exports.deleteInbound = async (req, res, next) => {
    try {
        const { id } = req.params;
        const inbound = await Inbound.findByIdAndDelete(id);
        if (!inbound) throw new Error('Inbound does not exist!');
        io.getIO().emit('inbound', { action: 'delete', inbound: inbound });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};
