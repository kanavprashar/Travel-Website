import express from 'express'; 
import { connect, Schema, model } from 'mongoose';
import bodyParser from 'body-parser';
const { json, urlencoded } = bodyParser;

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(json());
app.use(urlencoded({ extended: true }));

// MongoDB connection
connect('mongodb://localhost:27017/greeceAdventure', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Booking Schema
const bookingSchema = new Schema({
    fullName: String,
    email: String,
    phone: String,
    travelers: Number,
    date: Date,
});

const Booking = model('Booking', bookingSchema);

// API Endpoint
app.post('/api/bokings', async (req, res) => {
    try {
        console.log(req.body); // Debugging: Check if form data is received
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).send('Booking confirmed!');
    } catch (error) {
        res.status(400).send('Error saving booking: ' + error.message);
    }
});

// Start server
app.listen(5823, () => {
    console.log('Server running on http://localhost:5823');
});
