import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import Verto from 'App/Models/Verto'

export default class ProfileController {
	public async dashboard({ view, auth }: HttpContextContract) {
		await auth.use('web').authenticate()
		const user = auth.user
		if (user) {
			await user.load('following')
			const ids = [user.id, ...user.following.map((f) => f.id)]
			const vertos = await Verto.query()
				.whereIn('user_id', ids)
				.preload('user')
				.orderBy('createdAt', 'desc')
			return view.render('profile/dashboard', { vertos })
		}
	}

	public async profile({ view, params }: HttpContextContract) {
		const username = params.username
		const user = await User.findBy('username', username)

		if (!user) {
			return view.render('errors/not-found')
		}

		await user.load('vertos')
		await user.load('following')
		await user.load('followers')

		return view.render('profile/index', { user })
	}

	public async edit({ view }: HttpContextContract) {
		return view.render('profile/edit')
	}

	public async update({ auth, request, response }: HttpContextContract) {
		const user = auth.user

		if (!user) return
		user.details = request.input('details')
		const photo = request.file('photo')

		if (photo) {
			const imgName =
				user.username.toLocaleLowerCase() + '-' + Date.now() + '.' + photo?.extname
			await photo.move(Application.publicPath(`images/${user.username}/avatars`), {
				name: imgName,
			})
			user.photo_path = `images/${user.username}/avatars/${imgName}`
		}

		user.save()
		return response.redirect(`/${user.username}`)
	}
}
