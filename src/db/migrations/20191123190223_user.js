exports.up = async knex => knex.schema.createTable('useless', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))
})

exports.down = async knex => knex.schema.dropTableIfExists('useless')
