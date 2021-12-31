import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Verto extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public title: string

	@column()
	public description: string

	@column()
	public image: string

	@column()
	public type: string

	// @column.dateTime()
	// public duration: DateTime

	@column()
	public isFinal: boolean

	@column()
	public price: string

	@column({ columnName: 'user_id' })
	public userId: number

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>
}
