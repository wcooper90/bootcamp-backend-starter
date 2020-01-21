
exports.up = async knex => knex.schema.createTable('friendships', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .uuid('requestorId')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  table
    .uuid('requesteeId')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  table
    .enum('status', ['ACCEPTED', 'PENDING', 'REQUESTED'])
})

exports.down = async knex => knex.schema.dropTableIfExists('friendships')
