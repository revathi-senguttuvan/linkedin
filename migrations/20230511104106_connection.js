/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("connection", table => {
        table.increments("id").primary();
       
        table.integer('personid').unsigned();
        table.integer('connectedto').unsigned();
        table.integer('requestedto').unsigned();
        table.string('personmail');
        table.string('invitemail');
        table.string('accepted');
        table.string('rejected');
        table.string('connect');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
