/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'WelcomeController.index')

Route.group(() => {
	Route.on('register').render('auth/signup').as('register')
	Route.on('login').render('auth/login').as('login')

	Route.post('register', 'AuthController.register').as('signup')
	Route.post('login', 'AuthController.login').as('signin')
}).middleware('guest')

Route.on('verify-email').render('auth/verify').as('verify-email')
Route.post('resend-email', 'AuthController.resendEmail').as('resend-email')
Route.get('verify/:email', 'AuthController.confirm').as('verifyEmail')

Route.group(() => {
	Route.get('/dashboard', 'ProfileController.dashboard').as('dashboard')
	Route.post('logout', 'AuthController.logout').as('logout')

	Route.post('follow/:id', 'FollowingController.follow').as('follow')
	Route.post('unfollow/:id', 'FollowingController.unfollow').as('unfollow')

	Route.get('account/edit', 'ProfileController.edit').as('profile.edit')
	Route.post('account/edit', 'ProfileController.update').as('profile.update')

	Route.resource('vertos', 'VertosController')
}).middleware(['auth']) // add 'verifiedEmail' to this array of middleware

Route.get('/:username', 'ProfileController.profile')

// Route.on('/signup').render('auth/signup').middleware('guest')
// Route.on('/login').render('auth/login').middleware('guest')

// Route.get('/verify-email/:email', 'EmailVerifiesController.confirm').as('verifyEmail')
// Route.post('/verify-email', 'EmailVerifiesController.index').middleware('auth')
// Route.post('/signup', 'AuthController.signup')
// Route.post('/login', 'AuthController.login')
// Route.post('/logout', 'AuthController.logout')

// Route.get('/posts/create', 'PostsController.create').middleware('auth')
// Route.post('/posts/create', 'PostsController.store').middleware('auth')

// Route.post('/follow/:userid', 'FollowsController.store').middleware('auth')
// Route.delete('/follow/:userid', 'FollowsController.destroy').middleware('auth')

// Route.get('/accounts/edit', 'ProfilesController.edit').middleware('auth')
// Route.post('/accounts/edit', 'ProfilesController.update').middleware('auth')
// Route.get('/:username', 'ProfilesController.index').middleware('auth')