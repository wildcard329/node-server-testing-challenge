
exports.up = function(knex) {
  return knex.schema.createTable('anime', anime => {
    anime.increments();

    anime
        .string('title', 128)
        .notNullable()
        .unique();
    anime
        .string('producer', 128)
        .notNullable()
    anime
        .string('description', 255)
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('anime');
};
