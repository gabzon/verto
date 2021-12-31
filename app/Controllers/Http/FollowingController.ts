import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class FollowingController {
	public async follow({ auth, params, response }: HttpContextContract) {
		const follower = auth.user
		if (!follower) return

		const user = await User.findOrFail(params.id)
		await user.related('followers').attach([follower.id])
		return response.redirect().back()
	}

	public async unfollow({ auth, params, response }: HttpContextContract) {
		const follower = auth.user
		if (!follower) return

		const user = await User.findOrFail(params.id)
		await user.related('followers').detach([follower.id])
		return response.redirect().back()
	}
}
