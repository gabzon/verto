import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('username', 30).notNullable().unique().index()
      table.string('email', 255).notNullable().unique().index()
      table.dateTime('email_verified_at').nullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.string('gender', 10).nullable()
      table.date('dob').nullable()
      table.string('phone').nullable()
      table.text('details').nullable()
      table.string('photo_path', 2048).nullable()

      table.string('address', 255).nullable()
      table.string('address_extra', 255).nullable()
      table.string('zip', 20).nullable()
      table.string('city', 80).nullable()
      table.string('state', 80).nullable()
      table.string('country', 80).nullable()
      table.point('coordenates').nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
