const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter room name'],
        trim: true, //remove all blank spaces from start and end room name
        maxLength: [100, "Room name can not exceed 100 characters"]
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Please enter room price per night'],
        maxLength: [50, "Room name can not exceed 50 characters"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter room description']
    },
    address: {
        type: String,
        required: [true, 'Please enter room address']
    },
    guestCapacity: {
        type: Number,
        required: [true, 'Please enter guest capacity per room']
    },
    numOfBeds: {
        type: Number,
        required: [true, 'Please enter number of bedrooms']
    },
    internet: {
        type: Boolean,
        default: false,
    },
    breakfast: {
        type: Boolean,
        default: false,
    },
    airConditioned: {
        type: Boolean,
        default: false,
    },
    petsAllowed: {
        type: Boolean,
        default: false,
    },
    roomCleaning: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter room category'],
        enum: {
            values: [
                'King',
                'Single',
                'Twins'
            ],
            message: 'Please select correct category for room'
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.Now
    }
})

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);