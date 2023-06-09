const {Model}=require('objection');
const knex=require('../../config/dbConfig');

Model.knex(knex);

class Users extends Model{
    static get tableName(){
        return 'post';
    }
    static get jsonSchema(){
        return{
            type: 'object',
           
            properties: {
                id: { type: 'integer' },
                
                Text: { type: 'string' },
                JobTitle: { type: 'string' },
                JobPosition: { type: 'integer' },
                Experience: { type: 'integer' },
                Description: { type: 'string' },
                link: { type: 'string' },
                no_of_persons:{ type: 'integer' },
                


                
      
    
        
        
            }}
    }
}
module.exports=Users