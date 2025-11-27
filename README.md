## API & Page Endpoints

### Auth Routes
- POST /user → Register new user
- POST /user/login → Login user
- GET /signup → Signup page
- GET /login → Login page

### URL Management
- POST /url → Create short URL (NORMAL, ADMIN)
- GET /url/:shortId → Redirect to original URL
- GET /url/analytics/:shortId → View analytics (NORMAL, ADMIN)

### Dashboard Routes
- GET / → User dashboard (NORMAL, ADMIN)
- GET /admin/urls → Admin dashboard (ADMIN only)
