# Full-Stack Blog Platform

A complete blogging platform built with **React 19**, **TypeScript**, **Tailwind**, and a custom **Node.js + Express API**.  
Users can read posts, like them, save favourites, comment, and—once authenticated—create, edit and delete their own posts.

This project simulates a real-world CMS application and includes authentication, routing, data fetching, rich text editing and persistent storage.

👉 **Live Demo:** https://blogapp.hugo-miranda.dev  
👉 **Backend API:** https://github.com/hugolomba/blog-api

---

## 🚀 Features

### 👤 Authentication & Users

- Sign up, login and logout
- Protected routes
- Only authenticated users can create or edit posts
- Only owners can update/delete their posts

### 📝 Blog Functionalities

- Create, edit and delete posts
- Rich text editor (TinyMCE + Quill)
- Like and save favourite posts
- Comment system
- Individual post page
- Post list on homepage

### 🌐 Frontend Tech

- **React 19**
- **TypeScript**
- **Tailwind CSS + DaisyUI**
- **React Router**
- **React Query**
- **Axios**

### 🔧 Backend Tech (separate repository)

- Node.js
- Express
- PostgreSQL + Prisma
- JWT authentication
- REST API
- Error handling & validation

---

## 📂 Project Structure (Frontend)

```bash
src/
  components/
  pages/
  hooks/
  context/
  services/
  utils/
  types/
```

## Screenshot

<img src="https://res.cloudinary.com/dck0d5qwp/image/upload/v1758222727/Screenshot_2025-09-18_at_20.11.37_wiw0zp.png" width="200">
<img src="https://res.cloudinary.com/dck0d5qwp/image/upload/v1758222728/Screenshot_2025-09-18_at_20.10.50_sd4nnx.png" width="200">
<img src="https://res.cloudinary.com/dck0d5qwp/image/upload/v1758222727/Screenshot_2025-09-18_at_20.11.18_i1vc4w.png" width="200">
<img src="https://res.cloudinary.com/dck0d5qwp/image/upload/v1758222018/Screenshot_2025-09-18_at_19.58.01_iqrr1z.png" width="200">

## How to Run Locally

1. **Clone the repository:**
   ```bash
    git clone https://github.com/hugolomba/blog
    git clone https://github.com/hugolomba/blog-api
   ```
2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary variables (refer to `.env.example`).

   ```bash
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the backend server (inside blog-api):**

   ```bash
   npm run dev
   ```

5. **Start the frontend application:**
   ```bash
   npm run dev
   ```

## What I Learned

    •	Structuring a full-stack application
    •	JWT authentication flow
    •	Protected routes in React
    •	Data fetching and caching with React Query
    •	Integrating rich text editors
    •	Managing global state
    •	Designing API endpoints
    •	Deploying frontend and backend separately

## Future Improvements

    •	Admin panel + user roles
    •	Category/tag system
    •	Dark/light mode
    •	Theme customization

## Live Link

[Live Demo](https://blogapp.hugo-miranda.dev)
