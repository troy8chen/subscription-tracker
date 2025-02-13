## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Links](#links)
7. 🚀 [Deployment](#deployment)

## <a name="introduction">🤖 Introduction</a>

Followed: Backend Course by JavaScript Mastery [this video](https://youtu.be/rOpEN1JDaD0?si=-mgBd9ood6CDc96z)

Build a **production-ready Subscription Management System API** that handles **real subscriptions, automated reminders, and secure user management**. 

This API provides robust subscription tracking with features like:
- **Automated Email Reminders** at multiple intervals
- **Secure User Authentication** with JWT
- **Smart Workflow Management** using QStash
- **Rate Limiting** with Arcjet protection

## <a name="tech-stack">⚙️ Tech Stack</a>

- Node.js
- Express.js
- MongoDB
- QStash
- Arcjet
- Nodemailer

## <a name="features">🔋 Features</a>

👉 **Advanced Rate Limiting and Bot Protection**: Secure your API with Arcjet's intelligent rate limiting.

👉 **Database Modeling**: Efficient models and relationships using MongoDB & Mongoose.

👉 **JWT Authentication**: Secure user operations and subscription management.

👉 **Smart Email Reminders**: Multi-stage reminders (7, 5, 2, 1 days before renewal).

👉 **QStash Workflows**: Automated reminder scheduling and management.

👉 **Global Error Handling**: Comprehensive error management and logging.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone git@github.com:troy8chen/subscription-tracker.git
cd subscription-tracker
```

**Installing Dependencies**

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.development.local` in the root of your project and add the following content:

```bash
Server Configuration
PORT=5500
SERVER_URL="http://localhost:5500"
NODE_ENV=development
Database
DB_URI=your_mongodb_uri
JWT Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN="7d"
Arcjet
ARCJET_KEY=your_arcjet_key
ARCJET_ENV="development"
QStash
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_qstash_token
Nodemailer
EMAIL_PASSWORD=your_gmail_app_password
```
**Running the Project**

```bash
npm run dev
```

</details>

## <a name="links">🔗 Links</a>

- **MongoDB Atlas** - [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)
- **QStash Documentation** - [https://docs.upstash.com/qstash](https://docs.upstash.com/qstash)
- **Arcjet Platform** - [https://arcjet.com](https://arcjet.com)
- **Gmail App Passwords** - [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

## <a name="deployment">🚀 Deployment</a>

1. Set up your MongoDB Atlas cluster
2. Configure Gmail SMTP settings
3. Set up QStash production credentials
4. Deploy to your preferred hosting platform
5. Configure production environment variables
6. Set up SSL certificate

---
<div align="center">
  Made with ❤️ by Troy Chen
</div>

