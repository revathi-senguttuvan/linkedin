/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("job applied", table => {
        table.increments("id").primary();
        table.string("Email").notNullable();
        table.string("Password").notNullable();
        table.string("UserName").notNullable().unique();
        table.string("FirstName");
        table.string("LastName");
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("job applied");
  
};
