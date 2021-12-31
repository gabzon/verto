import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailVerified {
	public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
		if (auth.user?.emailVerifiedAt === null) {
			return response.redirect('verify-email')
		}
		await next()
	}
}
