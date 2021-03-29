exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("email");
    table.text("password");
    table.datetime("createdAt").defaultTo(knex.fn.now());
    table.datetime("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
