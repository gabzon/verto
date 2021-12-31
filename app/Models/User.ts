import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
	column,
	beforeSave,
	BaseModel,
	HasMany,
	hasMany,
	manyToMany,
	ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import Verto from './Verto'

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public name: string

	@column()
	public username: string

	@column()
	public email: string

	@column({ serializeAs: null })
	public password: string

	@column()
	public rememberMeToken?: string

	@column.dateTime()
	public emailVerifiedAt: DateTime

	@column()
	public gender: string

	@column()
	public dob: Date

	@column()
	public phone: string

	@column()
	public photo_path: string

	@column()
	public details: string

	@column()
	public address: string

	@column()
	public address_extra: string

	@column()
	public zip: string

	@column()
	public city: string

	@column()
	public state: string

	@column()
	public country: string

	@column()
	public coordenates: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password)
		}
	}

	public async sendVerificationEmail() {
		const url = Env.get('APP_URL') + Route.makeSignedUrl('verifyEmail', { email: this.email })
		await Mail.send((message) => {
			message
				.from('verify@verto.co')
				.to(this.email)
				.subject('Email confirmation')
				.htmlView('emails/email_confirmation', { name: this.name, url: url })
		})
	}

	public get avatar() {
		const background = this.gender === 'male' ? '0D8ABC' : 'FF69B4'

		if (this.photo_path) return this.photo_path

		return `https://eu.ui-avatars.com/api/?name=${encodeURI(
			this.name
		)}&background=${background}&color=ffffff`
	}

	@hasMany(() => Verto)
	public vertos: HasMany<typeof Verto>

	@manyToMany(() => User, {
		pivotTable: 'follows',
		pivotForeignKey: 'following_id',
		pivotRelatedForeignKey: 'follower_id',
		pivotTimestamps: true,
	})
	public followers: ManyToMany<typeof User>

	@manyToMany(() => User, {
		pivotTable: 'follows',
		pivotForeignKey: 'follower_id',
		pivotRelatedForeignKey: 'following_id',
		pivotTimestamps: true,
	})
	public following: ManyToMany<typeof User>

	public hasFollower(id: number) {
		return this.followers.map((f) => f.id).includes(id)
	}
}
