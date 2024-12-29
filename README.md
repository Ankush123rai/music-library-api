# Music Library Management API

A RESTful API for managing a music library with role-based access control, built with Node.js, Express.js, and MongoDB.

## Features

- **Authentication & Authorization**
  - Role-based access control (Admin, Editor, Viewer)
  - JWT-based authentication
  - First user automatically becomes Admin

- **Entity Management**
  - Artists (with Grammy awards tracking)
  - Albums
  - Tracks
  - User favorites

- **Access Control**
  - Admin: Full system access
  - Editor: Can modify content
  - Viewer: Read-only access

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing


## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ankush123rai/music-library-api.git
cd music-library-api
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
PORT=3000
MONGODB_URI=************************
JWT_SECRET=your-secret-key
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/signup` - Register new user
- `POST /api/v1/login` - Login user
- `GET /api/v1/logout` - Logout user

### Users
- `GET /api/v1/users` - Get all users (Admin only)
- `POST /api/v1/users/add-user` - Add new user (Admin only)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)
- `PUT /api/v1/users/update-password` - Update password

### Artists
- `GET /api/v1/artists` - Get all artists
- `GET /api/v1/artists/:id` - Get single artist
- `POST /api/v1/artists/add-artist` - Add new artist
- `PUT /api/v1/artists/:id` - Update artist
- `DELETE /api/v1/artists/:id` - Delete artist

### Albums
- `GET /api/v1/albums` - Get all albums
- `GET /api/v1/albums/:id` - Get single album
- `POST /api/v1/albums/add-album` - Add new album
- `PUT /api/v1/albums/:id` - Update album
- `DELETE /api/v1/albums/:id` - Delete album

### Tracks
- `GET /api/v1/tracks` - Get all tracks
- `GET /api/v1/tracks/:id` - Get single track
- `POST /api/v1/tracks/add-track` - Add new track
- `PUT /api/v1/tracks/:id` - Update track
- `DELETE /api/v1/tracks/:id` - Delete track

### Favorites
- `GET /api/v1/favorites/:category` - Get favorites by category
- `POST /api/v1/favorites/add-favorite` - Add to favorites
- `DELETE /api/v1/favorites/remove-favorite/:id` - Remove from favorites

## Response Format

All API responses follow this structure:
```json
{
  "status": 200,
  "data": null | object | array,
  "message": "Success message",
  "error": null | "Error message"
}
```

## Error Codes

- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Query Parameters

### Pagination
- `limit`: Number of records (default: 5)
- `offset`: Number of records to skip (default: 0)

### Filtering
- Artists: `grammy`, `hidden`
- Albums: `artist_id`, `hidden`
- Tracks: `artist_id`, `album_id`, `hidden`

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # Route definitions
└── utils/         # Utility functions
```

## Security

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Request validation
- Error handling middleware

## License

MIT License