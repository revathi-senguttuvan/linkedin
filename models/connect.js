const {Model}=require('objection');
const knex=require('../config/dbConfig');
Model.knex(knex);

class Users extends Model{
    static get tableName(){
        return 'connection';
    }
    static get jsonSchema(){
        return{
            type: 'object',
           
            properties: {
                id: { type: 'integer' },
                personid: { type: 'integer' },
                connectedto: { type: 'integer' },
                requestedto: { type: 'integer' },
                personmail: { type: 'string' },
                invitemail: { type: 'string' },
                accepted: { type: 'string' },
                rejected: { type: 'string' },
                connect:{type:'string'}
                
            }}
    }
}
module.exports=Users