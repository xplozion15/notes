# Personal Blog Web App
A personal blog web application where users can read posts and leave comments. Built with a modern tech stack, it combines a smooth, responsive design with an enhanced writing experience using TinyMCE, and supports Dark and Light mode for a comfortable reading experience.

## Live Demo
[Notes](https://notes-mpon.onrender.com/)
[Admin dashboard](https://notes-admin.onrender.com/login)

## Tech Stack
- **Backend:** Node.js, Express, express-validator
- **Frontend:** React, CSS Modules
- **Authentication:** JWT-based secure login
- **Database:** Prisma + PostgreSQL
- **Text Editor:** TinyMCE for rich blog post creation
- **Theme Support:** Dark and Light mode with smooth transitions

## Features
- **Dark/Light Mode:** Users can switch between Dark and Light mode for better readability and comfort
- **Reading Stats:** Each post shows the word count and estimated reading time (e.g., 338 words | 2 minutes), helping readers plan their reading
- **Scroll-to-Top Arrow:** A smooth scroll button appears when users scroll down, making navigation easier and more user-friendly
- **Secure Authentication:** Authors/Admins can log in and access protected routes
- **Post Management:** Create, read, update, and delete blog posts easily
- **Rich Text Editing:** TinyMCE allows full formatting options for blog content
- **Comment System:** Users can comment on posts, and authors can moderate them
- **Admin Dashboard:** Manage posts, categories, and comments from a dedicated interface
- **Categories:** Organize posts into categories for easier navigation
- **Responsive Design:** Works seamlessly on desktops, tablets, and mobile devices
- **Debounced Search:** Blog posts can be searched with a debounced input that runs every 300ms, reducing unnecessary API calls and improving performance

## What I Learned
- Implementing Dark/Light mode for user-preference-based theming
- Calculating word counts and estimated reading times for posts
- Adding smooth scroll functionality for better user experience
- Building a RESTful API using Node.js and Express
- Designing database models for users, posts, and comments with Prisma
- Implementing JWT authentication and protected routes
- Fetching and displaying data dynamically in React
- Managing state and forms for posts and comments
- Integrating TinyMCE for a rich writing experience
- Creating responsive frontends to consume the API
- Validating backend forms with express-validator

## Future Updates
- **Pagination for Blog Posts:** Implement server-side pagination to efficiently load large numbers of posts without slowing down the frontend.
- **API Rate Limiting:** Add rate limiting to protect the API from abuse and ensure a stable experience for all users.

## Credits
- **Cat Avatar:** [AvatarMaker.fun](https://avatarmaker.fun/)
- **About Section Image:** Photo from [Unsplash](https://unsplash.com/photos/turned-on-gray-laptop-computer-XJXWbfSo2f0) by [Luca Bravo](https://unsplash.com/@lucabravo)
- **Favicon:** [Flaticon](https://www.flaticon.com/free-icon/blogging_1187595?term=blog&page=1&position=4&origin=tag&related_id=1187595) by [Freepik](https://www.flaticon.com/authors/freepik)
- **Font:** [Syne - Google Fonts](https://fonts.google.com/specimen/Syne)
- **Text Editor:** [TinyMCE](https://www.tiny.cloud/) by Tiny Technologies
