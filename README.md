# SoftUni JS Back-End Exam Preparation 

## Cheat Sheet  

1. Initialize project
- [x] `npm init --y`
- [x] Change module system
- [x] Nodemon setup `npm i -D nodemon`
- [x] Add dev script
- [x] Setup debugging
2. Express
- [x] `npm i express`
- [x] Setup initial http server
- [x] Add public resources (images, css...)
- [x] Add static middleware
- [x] Add body parser
- [x] Add routes modular router
- [x] Add home controller
3. Handlebars
- [x] Install handlebars `npm i express-handlebars`
- [x] Config handlebars with express
- [x] Enable mongo documents to be passed to the view
- [x] Change views directory
- [x] Add resources to views folder 
- [x] Add home view
- [x] Add layout
- [x] Add partials directory
4. Database
- [x] Install momgoose `npm i mongoose`
- [x] Setup db connection
- [x] Add user model
5. Register
- [x] Fix Navigation links
- [x] Add register view
- [x] Add authController
- [x] Add Register Page
- [x] Fix register form
- [x] Add post register action
- [x] Add authService with register
- [x] Install bcrypt `npm i bcrypt`
- [x] Hash the password
- [x] Check rePassword
- [x] Check if User exists
6. Login 
- [x] Add cookie parser `npm i cookie-parser`
- [x] Add jsonwebtoken `npm i jsonwebtoken`
- [x] Add cookie parser middleware
- [x] Add login view
- [x] Add get login action
- [x] Fix login form
- [x] Add post login action
- [x] Add login to authService
- [x] Validate user
- [x] Validate password
- [x] Generate token
- [x] Return token as cookie
- [x] Autologin on register
7. Logout
- [x] Add get logout action
8. Authentication 
- [x] Add auth middleware (token verification)
- [x] Check if guest
- [x] Token verification
- [x] Attach user to request
- [x] Attach user to handlebars context
9. Authorization
- [x] Add isAuth middleware
- [x] Add route guards authorization
10. Error Handling
- [x] Add notifications
- [x] Extract error message
- [x] Add error handling for register
- [ ] Add error handling for login
11.Bonus
- [ ] Dynamic Navigation
- [ ] Async jsonwebtoken
- [ ] ViewBag
- [ ] Dynamic Titles