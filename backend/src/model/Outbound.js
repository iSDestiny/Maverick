const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outboundSchema = new Schema(
    {
        amzl: {
            type: String,
            required: true
        },
        door: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Outbound', outboundSchema);
