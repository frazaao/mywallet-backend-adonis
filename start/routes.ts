import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('/users', 'UsersController').apiOnly()
Route.post('/users/login', 'UsersController.login')
Route.resource('/transactions', 'TransactionsController').apiOnly()