const { Schema, model } = require('mongoose');

const propertySchema = new Schema({
    type: {
        type: String,
        required: false,
    },
    addressStreet: {
        type: String,
        required: true
    },
    addressCity: {
        type: String,
        required: true
    },
    addressState: {
        type: String,
        required: true
    },
    addressZip: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tenant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    images: [
        {
        type: String,
        }
    ],
    description: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
});

const Property = model('Property', propertySchema);

module.exports = Property;
