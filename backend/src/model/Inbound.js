const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inboundSchema = new Schema(
    {
        door: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Inbound', inboundSchema);
