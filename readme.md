# 🏠 Rent Flatmate Finder

A full-stack web application that helps tenants discover rental listings, check compatibility with properties, express interest, and communicate directly with property owners. The platform provides separate dashboards for Owners and Tenants with secure authentication and an end-to-end rental workflow.

---

## 📌 Features

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT Authentication
- Role-Based Access Control (Owner / Tenant)
- Protected Routes

### 👤 Owner Features
- Dashboard
- Create New Listing
- Edit Listing
- Mark Listing as Filled
- View My Listings
- Receive Tenant Interests
- Accept / Decline Interest Requests
- Chat with Interested Tenants

### 🏡 Tenant Features
- Browse Available Listings
- View Listing Details
- Compatibility Score Generation
- Send Interest to Owners
- View Sent Interests
- Chat with Owners after Acceptance

### 💬 Chat System
- One-to-One Conversations
- Message History
- Conversation Creation after Interest Acceptance

### 🤖 Compatibility System
- Generates compatibility score between tenant preferences and listing details.
- Displays compatibility percentage along with an explanation.

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

## Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt

## Database
- PostgreSQL

---

# 📂 Project Structure

```
rent-flatmate-finder/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│
└── README.md
```

---

# 🗄 Database Schema

Main Models

- User
- Listing
- TenantProfile
- Interest
- Compatibility
- Conversation
- Message

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Anshika29/rent-flatmate-finder.git

cd rent-flatmate-finder
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_secret_key

PORT=5000
```

Run Prisma Migration

```bash
npx prisma generate

npx prisma migrate dev
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🔑 Environment Variables

Backend `.env`

```env
DATABASE_URL=

JWT_SECRET=

PORT=5000
```

Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---


### Owner Dashboard

- Dashboard
- My Listings
- Interests
- Chats

### Tenant Dashboard

- Available Listings
- Listing Details
- Compatibility Score
- My Interests
- Chat


---

# 🔄 Workflow

```text
Owner Login
      │
      ▼
Create Listing
      │
      ▼
Tenant Browses Listings
      │
      ▼
View Listing Details
      │
      ▼
Check Compatibility
      │
      ▼
Send Interest
      │
      ▼
Owner Accepts Interest
      │
      ▼
Conversation Created
      │
      ▼
Owner ↔ Tenant Chat
```

---

# 📡 API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
GET  /auth/me
```

## Listings

```
GET    /listings
GET    /listings/my
GET    /listings/:id
POST   /listings
PUT    /listings/:id
PATCH  /listings/:id/fill
```

## Interests

```
POST   /interests/:listingId
GET    /interests/received
GET    /interests/sent
PATCH  /interests/:id/accept
PATCH  /interests/:id/decline
```

## Compatibility

```
POST /compatibility/:listingId
```

## Messages

```
GET  /messages/conversations
GET  /messages/:conversationId
POST /messages/:conversationId
```

---

# 🎯 Future Improvements

- Image Upload for Listings
- Advanced Search & Filters
- Google Maps Integration
- Real-Time Chat using Socket.IO
- Notifications
- Email Alerts
- Wishlist / Saved Listings

---