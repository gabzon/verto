import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Verto from 'App/Models/Verto'

export default class WelcomeController {
	public async index({ view, auth }: HttpContextContract) {
		const vertos = await Verto.query().preload('user')
		if (auth.isLoggedIn) {
			return view.render('profile/dashboard', { vertos })
		}

		return view.render('welcome', { vertos })
	}
}
