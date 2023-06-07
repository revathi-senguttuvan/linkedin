/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("jobapplied", table => {
        table.increments("id").primary();
        table.integer("users_id").unsigned();
        table.integer("post_id").unsigned();
        table.string('Email');
        table.string('ownermail');
        table.string('Status')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("job applied");
  
};
