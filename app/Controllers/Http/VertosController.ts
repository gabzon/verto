import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Verto from 'App/Models/Verto'
import Application from '@ioc:Adonis/Core/Application'

export default class VertosController {
	public async index({ view }: HttpContextContract) {
		return view.render('vertos/index')
	}

	public async create({ view }: HttpContextContract) {
		return view.render('vertos/create')
	}

	public async store({ auth, request, response }: HttpContextContract) {
		const user = auth.user
		if (!user) return

		const verto = new Verto()
		verto.title = request.input('title')
		verto.description = request.input('description')

		const photo = request.file('image')
		if (photo) {
			const imgName = Date.now() + '.' + photo?.extname
			await photo.move(
				Application.publicPath(`images/${user.username.toLowerCase()}/vertos`),
				{ name: imgName }
			)
			verto.image = `images/${user.username}/vertos/${imgName}`
		}
		verto.userId = user.id
		verto.save()
		return response.redirect(`/${user.username}`)
	}

	public async show({ view }: HttpContextContract) {
		return view.render('vertos/show')
	}

	public async edit({ view }: HttpContextContract) {
		return view.render('vertos/index')
	}

	public async update({ response }: HttpContextContract) {
		return response.redirect('vertos.index')
	}

	public async destroy({}: HttpContextContract) {}
}
