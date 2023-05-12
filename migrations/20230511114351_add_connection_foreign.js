/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("connection", table => {
      
        table.foreign("personid").references("users.id");
        table.foreign("connectedto").references("users.id");
        table.foreign("requestedto").references("users.id");
        
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("connection", table => {
        table.dropForeign("personid");
        table.dropForeign("connectedto");
        table.dropForeign("requestedto");
    });
  
};
