Dashboard Application
This project is a full-stack web application that includes a client-side dashboard and server-side API for managing user data and logs. It allows users to view their logs, and admins to manage logs, including deletion functionality.




Technologies Used
Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Axios
Backend: Node.js, Express.js, MongoDB, JWT Authentication
Database: MongoDB
State Management: Recoil (optional, based on your setup)

Client Setup
Prerequisites
Node.js: Ensure that you have Node.js installed on your machine. You can download it from here.
Yarn (optional, but recommended): You can use yarn for managing dependencies. Install it from here.
Steps
Clone the repository:

```bash
git clone https://github.com/your-repo/dashboard-app.git
cd dashboard-app
Install dependencies: Use either npm or yarn to install the dependencies.
```

```bash
Copy code
npm install
# OR
yarn install
```
Create .env file for environment variables: You will need to add any necessary environment variables like API base URL or secret keys. Example:

```env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:8000/
```
Start the development server: To run the client in development mode:

```bash
Copy code
npm run dev
# OR
yarn dev
```
This will start the application on http://localhost:3000 by default.

Server Setup
Prerequisites
Node.js: Make sure you have Node.js installed (as mentioned above).
MongoDB: Ensure that you have a MongoDB instance running. You can either use a local MongoDB installation or a cloud service like MongoDB Atlas.
Steps
Clone the repository (if not done already):

```bash
Copy code
git clone https://github.com/your-repo/dashboard-app.git
cd dashboard-app
Install dependencies: Navigate to the server folder (if you have a separate folder for backend code) and install the dependencies.
```

```bash
Copy code
npm install
# OR
yarn install
Create .env file for environment variables: You need to configure your backend environment variables. Example:
```
```env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/dashboardDB
JWT_SECRET=your_jwt_secret
```
Start the server:

bash
```Copy code
npm start
# OR
yarn start
```
The backend API will be accessible on http://localhost:5000 by default.

Running the Application
Once both the client and server are running, you can access the full application in your browser.

Frontend: Open your browser and go to http://localhost:3000.
Backend: The API server is running on http://localhost:5000.
The client application should automatically interact with the backend API to fetch and manage user logs.

API Endpoints
Here is a list of key API endpoints used in this project:

1. Get User Data
Endpoint: GET /api/user/data
Description: Fetches user data and logs.
Response: JSON containing user details and logs.
2. Delete Log
Endpoint: PUT /api/log/deletelog/:logId
Description: Marks a log as deleted for the given logId.
Request Params: logId (ID of the log to delete).
Response: Success or error message.
3. Login
Endpoint: POST /api/auth/login
Description: Authenticates a user and returns a JWT token.
Request Body: { email, password }
Response: JWT token.
