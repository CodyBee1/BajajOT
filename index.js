const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mime = require('mime-types');

const app = express();
app.use(bodyParser.json());
const upload = multer();

// Helper function to extract numbers, alphabets, and highest lowercase alphabet
const processData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                if (!highestLowercase || item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    return { numbers, alphabets, highestLowercase };
};

// POST method for /bfhl endpoint
app.post('/bfhl', upload.single('file_b64'), (req, res) => {
    const { data, file_b64 } = req.body;
    const { numbers, alphabets, highestLowercase } = processData(data);
    
    // Basic file handling logic (this can be enhanced further based on requirements)
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKb = 0;
    if (file_b64) {
        fileMimeType = mime.lookup(file_b64); // For simplicity
        fileSizeKb = Buffer.byteLength(file_b64, 'base64') / 1024;
        fileValid = !!fileMimeType; // Valid if mime type is recognized
    }

    const response = {
        is_success: true,
        user_id: 'your_fullname_ddmmyyyy',  // Replace with your actual user ID format
        email: 'your_email@example.com',    // Replace with your actual email
        roll_number: 'your_roll_number',    // Replace with your actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType || 'unknown',
        file_size_kb: fileSizeKb || 0
    };

    res.status(200).json(response);
});

// GET method for /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
