
exports.up = async knex => knex.schema.createTable('journalEntries', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .uuid('userId')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

  table
    .date('date')
    .notNullable()

  table
    .text('text')
})

exports.down = async knex => knex.schema.dropTableIfExists('journalEntries')
