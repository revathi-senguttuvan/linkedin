/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("jobapplied", table => {
      
        table.foreign("users_id").references("users.id");
        table.foreign("post_id").references("post.id");
        
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 */
exports.down = function(knex) {
    return knex.schema.table("job applied", table => {
        table.dropForeign("users_id");
        table.dropForeign("post_id");
    });
  
  
};
