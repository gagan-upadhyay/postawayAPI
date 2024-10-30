Social Media RESTful API
A RESTful API built with Node.js, Express, and MongoDB, enabling efficient data handling and secure routing for a social media application. The API supports user authentication, post management, comments, likes, friendships, user profile updates, and OTP-based password resets.

Features
1. Code Modularity
Developed using ES6 modules for modular, maintainable code.
2. User Authentication
Provides signup, login, and logout, including logging out from all devices.
3. Post Management
CRUD operations for posts with fields like caption and image URL.
Only the post owner can update or delete a post.
4. Comment System
Users can comment on posts and reply to other comments.
5. Like System
Users can like or unlike both posts and comments.
6. Friendship Feature
Users can send and respond to friend requests (accept or reject).
Friend request status defaults to "pending."
7. User Profile Update
Users can update their profile, including fields like name, gender, and avatar.
8. OTP-based Password Reset
Users can reset their password through OTP verification.
API Endpoints
Authentication Routes
Endpoint	Method	Description
/api/users/signup	POST	Register a new user
/api/users/signin	POST	Log in as a user
/api/user/logout	POST	Logs out the currently logged-in user
/api/user/logout-all-devices	POST	Log out the user from all devices
User Profile Routes
Endpoint	Method	Description
/api/users/get-details/:userId	GET	Retrieve non-sensitive information about a specific user
/api/users/get-all-details	GET	Retrieve information about all users excluding sensitive data like password
/api/users/update-details/:userId	PUT	Update user details, without exposing or altering sensitive data
Post Routes
Endpoint	Method	Description
/api/posts/all	GET	Retrieve all posts from various users for the news feed
/api/posts/:postId	GET	Retrieve a specific post by ID
/api/posts/:	GET	Retrieve all posts by a specific user for their profile page
/api/posts/	POST	Create a new post
/api/posts/:postId	DELETE	Delete a specific post (owner only)
/api/posts/:postId	PUT	Update a specific post (owner only)
Comment Routes
Endpoint	Method	Description
/api/comments/:postId	GET	Get comments for a specific post
/api/comments/:postId	POST	Add a comment to a specific post
/api/comments/:commentId	DELETE	Delete a specific comment
/api/comments/:commentId	PUT	Update a specific comment
Likes Routes
Endpoint	Method	Description
/api/likes/:id	GET	Get likes for a specific post or comment
/api/likes/toggle/:id	POST	Toggle like status on a post or comment
Friends Routes
Endpoint	Method	Description
/api/friends/get-friends/:userId	GET	Get a user's friends
/api/friends/get-pending-requests	GET	Get pending friend requests
/api/friends/toggle-friendship/:id	POST	Toggle friendship status with another user
/api/friends/response-to-request/:id	POST	Respond to a friend request (accept or reject)
OTP Routes
Endpoint	Method	Description
/api/otp/send	POST	Send OTP for password reset
/api/otp/verify	POST	Verify an OTP
/api/otp/reset-password	POST	Reset the user's password
Getting Started
Prerequisites
Node.js installed
MongoDB for data persistence
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <repository-directory>
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and define the following variables:

plaintext
Copy code
PORT=<Your_Port_Number>
MONGO_URI=<Your_MongoDB_URI>
JWT_SECRET=<Your_JWT_Secret>
OTP_SECRET=<Your_OTP_Secret>
Start the server:

bash
Copy code
npm start
Usage
Use Postman or similar tools to test the API endpoints.

Project Structure
bash
Copy code
.
├── controllers          # Controllers for handling requests
├── models               # Database models
├── routes               # API routes
├── middleware           # Middleware for authentication, error handling
├── utils                # Utility functions
└── app.js               # Entry point for the application
License
This project is licensed under the MIT License.

This README provides a concise overview of the API's structure, routes, and functionality for easy reference and setup.