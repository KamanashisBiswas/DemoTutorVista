# Express Authentication Server

A clean and modular Express.js server with JWT authentication and MongoDB integration. Every functionality is organized in separate files for better maintainability.

## 🚀 Features

- **User Authentication**: Register, Login, Logout
- **JWT Tokens**: Access and Refresh token system
- **Password Security**: BCrypt hashing
- **Role-based Access**: User and Admin roles
- **Input Validation**: Comprehensive validation with express-validator
- **Error Handling**: Centralized error handling
- **MongoDB Integration**: Mongoose ODM
- **Clean Architecture**: Modular file structure
- **CORS Support**: Cross-origin resource sharing

## 📁 Project Structure

```
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Global error handler
│   └── validation.js       # Validation handler
├── models/
│   └── User.js             # User model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── user.js             # User management routes
├── utils/
│   ├── asyncHandler.js     # Async error handler
│   └── jwt.js              # JWT utilities
├── validations/
│   ├── authValidation.js   # Auth validation rules
│   └── userValidation.js   # User validation rules
├── .env.example            # Environment variables template
├── package.json            # Dependencies
└── server.js               # Application entry point
```

## 🛠️ Installation

1. **Clone and Install**

```bash
git clone <repository-url>
cd express-auth-server
npm install
```

2. **Environment Setup**

```bash
cp .env.example .env
```

3. **Configure Environment Variables**

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/auth_system
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

4. **Start MongoDB**

```bash
# Using MongoDB Community Server
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. **Run the Server**

```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description              | Access  |
| ------ | ----------- | ------------------------ | ------- |
| POST   | `/register` | Register new user        | Public  |
| POST   | `/login`    | Login user               | Public  |
| POST   | `/refresh`  | Refresh access token     | Public  |
| POST   | `/logout`   | Logout user              | Private |
| GET    | `/me`       | Get current user profile | Private |

### User Routes (`/api/user`)

| Method | Endpoint           | Description         | Access  |
| ------ | ------------------ | ------------------- | ------- |
| PUT    | `/profile`         | Update user profile | Private |
| PUT    | `/change-password` | Change password     | Private |
| DELETE | `/account`         | Delete user account | Private |
| GET    | `/all`             | Get all users       | Admin   |
| GET    | `/:id`             | Get user by ID      | Admin   |
| PUT    | `/:id/role`        | Update user role    | Admin   |
| DELETE | `/:id`             | Delete user         | Admin   |

## 🔐 Authentication Flow

1. **Register/Login** → Receive access & refresh tokens
2. **API Requests** → Include `Authorization: Bearer <access_token>`
3. **Token Refresh** → Use refresh token when access token expires
4. **Logout** → Invalidate refresh token

## 📝 Request Examples

### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Login User

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <your_access_token>"
```

### Update Profile

```bash
curl -X PUT http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

## 🔒 Security Features

- **Password Hashing**: BCrypt with salt rounds
- **JWT Security**: Signed tokens with expiration
- **Input Validation**: Comprehensive validation rules
- **Rate Limiting**: Prevent brute force attacks (implement as needed)
- **CORS Protection**: Configurable origins
- **Error Handling**: No sensitive data exposure

## 🚦 Response Format

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "user": { ... },
    "tokens": { ... }
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

## 🛠️ Development

### Adding New Routes

1. Create controller function in appropriate controller file
2. Add validation rules in validation folder
3. Define route in routes folder
4. Import and use in server.js

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: Access token expiration time
- `CORS_ORIGIN`: Allowed CORS origins

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT implementation
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.
