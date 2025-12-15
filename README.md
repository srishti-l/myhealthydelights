Project Overview:
    Healthy Delights is a modern bakery website designed for customers to easily browse through products and place custom cake orders, and for admins to manage the site through CRUD operations. The goal of the site was to modernize the real bakery's site and create a more intuitive UI. 

Technologies Used: 
    Frontend: React, CSS, HTML
    Backend: Node.js, Express.js
    Database: MongoDB
    Testing: Jest, Sinon, Postman
    Deployment: Google Cloud

User-Facing Features: 
    Browse bakery products by category
    Scrollable gallery of product images
    Submit custom cake orders
    Login or continue as guest
    CRUD operations for account management

Admin Features:
    CRUD operations for products
    Receive custom cake orders 

Setup & Installation: 
1. Clone the Repo
    git clone https://github.com/<yourusername>/myhealthydelights
    cd healthy-delights

2. Install dependencies
    cd client
    npm install
    cd ../server
    npm install

Environment Variables
1. Frontend .env: REACT_APP_API_URL=http://localhost:6790
2. Backend .env:
    MONGODB_URI=<your-mongodb-connection-string>
    PORT=6790

Running The Project: 
1. Backend
    cd server
    npm start
2. Frontend
    cd client
    npm start

Testing (Jest)
    cd server
    npm test

Testing (Postman)
All backend API routes were tested using Postman during development. 

Tested routes include: 
    1. Product routes (fetch products, filter by category)
    2. User Authentication (login)
    3. Admin CRUD operations
    4. Custom cake order submission (POST)

Deployment
    Push both frontend and backend to Google Cloud


