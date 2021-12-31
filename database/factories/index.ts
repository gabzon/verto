import User from 'App/Models/User'
import Verto from 'App/Models/Verto'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export const UserFactory = Factory.define(User, ({ faker }) => {
	const gender = faker.random.arrayElement(['male', 'female'])
	var io: number = 0
	if (gender === 'female') {
		io = 1
	}
	return {
		name: faker.name.firstName(io) + ' ' + faker.name.lastName(io),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		email_verified_at: DateTime.local(),
		password: faker.internet.password(),

		gender: gender,
		dob: faker.date.recent(),
		phone: faker.phone.phoneNumber(),
		details: faker.lorem.lines(3),
		photo_path: faker.image.avatar(),

		address: faker.address.streetAddress(),
		zip: faker.address.zipCode(),
		city: faker.address.cityName(),
		state: faker.address.state(),
		country: faker.address.country(),
	}
})
	.relation('vertos', () => VertoFactory)
	.build()

export const VertoFactory = Factory.define(Verto, ({ faker }) => {
	return {
		title: faker.lorem.word(),
		description: faker.lorem.lines(3),
		image: faker.image.business(),
		type: faker.random.arrayElement(['service', 'product']),
		is_final: faker.random.arrayElement([true, false]),
	}
})
	.relation('user', () => UserFactory)
	.build()
