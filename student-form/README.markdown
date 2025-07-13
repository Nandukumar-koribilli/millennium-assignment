# Student Application Form

A web application for collecting student data (personal, educational, additional details) with file uploads, storing submissions in MongoDB Atlas.

## Features
- Multi-step form with progress bar
- Collects personal details, educational background, and additional information
- File uploads for photo and signature
- Data stored in MongoDB Atlas
- Success message on submission with option to reset form
- Responsive design

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (Fetch API for AJAX)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **File Uploads**: Multer
- **Dependencies**: `express`, `mongoose`, `multer`, `cors` (optional)

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd student-form
   ```

2. **Install Dependencies**
   ```bash
   npm init -y
   npm install express mongoose multer cors
   ```

3. **MongoDB Atlas Setup**
   - Create a cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Add your IP to Network Access (e.g., `0.0.0.0/0` for testing).
   - Create a database user (e.g., `nandukumar9980` with password `kumar456`).
   - Use the connection string: `mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/student-form?retryWrites=true&w=majority`
   - Update `server.js` with the connection string or use a `.env` file:
     ```bash
     npm install dotenv
     ```
     Create `.env`:
     ```plaintext
     MONGODB_URI=mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/student-form?retryWrites=true&w=majority
     ```
     Update `server.js`:
     ```javascript
     require('dotenv').config();
     const uri = process.env.MONGODB_URI;
     ```

4. **Create Uploads Folder**
   ```bash
   mkdir uploads
   ```

5. **Run the Server**
   ```bash
   node server.js
   ```
   - Confirms: `Server running on port 3000` and `Connected to MongoDB Atlas`.

6. **Serve the Frontend**
   - Install `live-server`:
     ```bash
     npm install -g live-server
     ```
   - Run:
     ```bash
     live-server
     ```
   - Open `http://localhost:8080` in a browser.

7. **Test the Application**
   - Fill out the form (all steps).
   - Upload photo and signature.
   - Submit and verify the success message.
   - Check MongoDB Atlas (`student-form.students`) for saved data.
   - Verify files in `./uploads`.

## Project Structure
```
student-form/
├── index.html       # Frontend form
├── server.js        # Backend server
├── uploads/         # Folder for uploaded files
├── package.json     # Node.js dependencies
└── .env             # Environment variables (optional)
```

## Troubleshooting
- **Form Not Submitting**:
  - Check browser console (F12 > Console) for errors.
  - Ensure server is running (`node server.js`).
  - Verify CORS if needed:
    ```javascript
    const cors = require('cors');
    app.use(cors());
    ```
- **MongoDB Connection Error**:
  - Confirm connection string and credentials.
  - Check Network Access in MongoDB Atlas.
  - Test DNS: `nslookup _mongodb._tcp.cluster0.ecnna5x.mongodb.net`.
- **File Upload Issues**:
  - Ensure `./uploads` exists and is writable.
  - Check server logs for `multer` errors.

## Security Notes
- Use `dotenv` for sensitive data (MongoDB URI).
- Restrict MongoDB Atlas IP access in production.
- Validate file uploads (size, type) for security.

## Deployment
- Deploy to platforms like Heroku or AWS.
- Serve `index.html` via Express:
  ```javascript
  app.use(express.static('public'));
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
  ```
- Move `index.html` to a `public` folder.

## License
MIT License