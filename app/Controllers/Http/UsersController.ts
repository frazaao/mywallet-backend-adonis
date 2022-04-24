import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/Users'

export default class UsersController {

  public async index({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate();

    return user.type === "Administrator" ? (
      response.status(200),
      Users.all()
    ) : (
      response.status(401),
      { message: "You don't have permission to access this" }
    ) ;
  }

  public async store({ request }: HttpContextContract) {
    const { email, password, name } = request.all()

    const user = Users.create({ email, password, name, type:"Client" })

    return user
  }

  public async show({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return user
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const authUser = await auth.authenticate()

    if(authUser.type === "Administrator"){
      const id = params.id;
      const user = await Users.findOrFail(id);

      const { email, name, password } = request.all()

      user.merge({ email, name, password })

      user.save()

      return user
    }else{
      const id = authUser.id;

      const user = await Users.findOrFail(id);

      const { email, name, password } = request.all()

      user.merge({ email, name, password })

      user.save()

      return user
    }
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const authUser = await auth.authenticate()

    if(authUser.type === "Administrator"){
      const id = params.id
      const user = await Users.findOrFail(id)

      user.delete()
    }else{
      return { message: "You don't have permission to do that, please contact an Administrator" }
    }
  }

  public async login({ auth, request }: HttpContextContract){    
    const { email, password } = request.all()

    const user = await auth.attempt(email, password )

    return user
  }
}
