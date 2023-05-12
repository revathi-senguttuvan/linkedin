/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("post", table => {
        table.increments("id").primary();
        table.integer("users_id").unsigned();
        table.string("Text");
        table.string("JobTitle");
        table.integer("JobPosition");
        table.integer("Experience");
        table.string("Description");
        table.string("Email");
        table.string('image');
        table.string("link");
        table.integer("no_of_persons");
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())



    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("post");


};
