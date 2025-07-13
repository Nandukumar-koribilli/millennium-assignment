const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

// MongoDB Atlas connection
const uri = "mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/student-form?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema for student application
const studentSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    nationality: { type: String, required: true },
    photo: { type: String, required: true },
    signature: { type: String, required: true },
    matric_board: { type: String, required: true },
    intermediate: { type: String },
    degree: { type: String, required: true },
    skills: { type: String },
    hobbies: { type: String },
    work_experience: { type: String }
});
const Student = mongoose.model('Student', studentSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use('/uploads', express.static('uploads'));

// API endpoint to handle form submission
app.post('/api/submit', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), async (req, res) => {
    try {
        const studentData = {
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            address: req.body.address,
            dob: new Date(req.body.dob),
            nationality: req.body.nationality,
            photo: req.files.photo[0].path,
            signature: req.files.signature[0].path,
            matric_board: req.body.matric_board,
            intermediate: req.body.intermediate,
            degree: req.body.degree,
            skills: req.body.skills,
            hobbies: req.body.hobbies,
            work_experience: req.body.work_experience
        };
        const student = new Student(studentData);
        await student.save();
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Submission failed' });
    }
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));