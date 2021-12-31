import { UserFactory } from 'Database/factories'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class UserSeeder extends BaseSeeder {
	public async run() {
		await UserFactory.with('vertos', 5).createMany(10)
	}
}
