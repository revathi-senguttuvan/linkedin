const {Model}=require('objection');
const knex=require('../config/dbConfig');
Model.knex(knex);

class Users extends Model{
    static get tableName(){
        return 'jobapplied';
    }
    static get jsonSchema(){
        return{
            type: 'object',
           
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                post_id: { type: 'integer' },
                Email: { type: 'string' },
                Status: { type: 'string' },
                
            }}
    }
}
module.exports=Users