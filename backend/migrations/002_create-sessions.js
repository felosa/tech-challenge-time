exports.up = function (knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.increments("id");
    table.text("description");
    table.integer("userId").unsigned();
    table.foreign("userId").references("users.id").onDelete("SET NULL");
    table.datetime("startTime");
    table.datetime("endTime");
    table.datetime("createdAt").defaultTo(knex.fn.now());
    table.datetime("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sessions");
};
