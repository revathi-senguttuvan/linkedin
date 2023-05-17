const {Model}=require('objection');
const knex=require('../config/dbConfig');
Model.knex(knex);

class Users extends Model{
    static get tableName(){
        return 'users';
    }
    static get jsonSchema(){
        return{
            type: 'object',
           
            properties: {
                id: { type: 'integer' },
                
                Email: { type: 'string' },
                Password: { type: 'string' },
                UserName: { type: 'string' },
                FirstName: { type: 'string' },
                LastName: { type: 'string' },
                Country: { type: 'string' },
                District:{ type: 'string' },
                Public:{ type: 'string' },
                SSLCPercentage:{ type: 'integer' },
                SSLCPassedOutYear:{ type: 'integer' },
                HSCPercentage:{ type: 'integer' },
                HSCPassedOutYear:{ type: 'integer' },
                CollegePercentage:{ type: 'integer' },
                CollegePassedOutYear:{ type: 'integer' },
                WorkExperience:{ type: 'integer' },
                Job:{ type: 'string' },
                Company:{ type: 'string' },
                Role:{ type: 'string' },
                PhoneNumber:{ type: 'number' },
                Connect:{ type: 'integer' },


                
      
    
        
        
            }}
    }
}
module.exports=Users
