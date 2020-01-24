
exports.up = async knex => knex.schema.createTable('messages', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .uuid('senderId')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  table
    .uuid('receiverId')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  table
    .date('dateSent')
    .notNullable()

  table
    .text('content')
})

exports.down = async knex => knex.schema.dropTableIfExists('messages')
