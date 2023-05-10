/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", table => {
        table.increments("id").primary();
        table.string("Email").notNullable();
        table.string("Password").notNullable();
        table.string("UserName").notNullable().unique();
        table.string("FirstName");
        table.string("LastName");
        table.string("Country");
        table.string("District");
        table.string("Public").defaultTo("yes");
        table.integer("SSLC Percentage");
        table.integer("SSLC PassedOutYear");
        table.integer("HSC Percentage");
        table.integer("HSC PassedOutYear");
        table.integer("College Percentage");
        table.integer("College PassedOutYear");
        table.integer("Work Experience");
        table.string("Job");
        table.string("Company");
        table.string("Role").defaultTo("user");
        table.bigInteger("Phone Number");
        table.integer("Connect");
        table.integer('OTP')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())



    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");

  
};
