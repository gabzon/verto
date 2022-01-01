import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const newRegisteredUserSchema = schema.create({
      name: schema.string(),
      username: schema.string(),
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
    })

    const errorMessages = {
      required: 'The {{ field }} is required to create a new account',
    }

    const validatedUser = await request.validate({
      schema: newRegisteredUserSchema,
      messages: errorMessages,
    })

    const user = new User()
    user.name = validatedUser.name
    user.username = validatedUser.username
    user.email = validatedUser.email
    user.password = validatedUser.password
    user.save()
    // user.sendVerificationEmail()

    return response.redirect('dashboard')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }

  public async resendEmail({ response, auth }: HttpContextContract) {
    auth.user?.sendVerificationEmail()
    return response.redirect().back()
  }

  public async confirm({ request, response, params }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await User.findByOrFail('email', params.email)
      user.emailVerifiedAt = DateTime.local()
      user.save()
      return response.redirect().toRoute('dashboard')
    } else {
      return {
        note: 'Invalid signature',
      }
    }
  }
}
