# Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb, where users can explore, create, edit, and review property listings.

## Features

- User Authentication & Authorization
- Create, Edit, and Delete Listings
- Upload Listing Images using Cloudinary
- Add and Manage Reviews
- Interactive Maps Integration
- Responsive User Interface
- Flash Messages and Form Validations

## Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Storage
- Passport.js
- Cloudinary
- Multer

## Installation

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/wanderlust.git
```

2. Navigate to the project directory

```bash
cd wanderlust
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file in the root directory and add the following variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
```

5. Start the application

```bash
node app.js
```

or

```bash
npm start
```

## Project Structure

```
controllers/
models/
routes/
views/
public/
utils/
app.js
middleware.js
cloudConfig.js
```

## Future Improvements

- Wishlist functionality
- Booking system
- Payment integration
- Advanced search and filters

## Author

Praveen Kumar
