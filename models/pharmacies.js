const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const pharmaciesSchema= new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{ 
        type:String,
        required: true
    },
    location: [
        {
            latitude:{type: Double, required:true},
            longitude:{type: Double, required: true}
        }
    ],
    imageUrl:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    openingHours:{
        type: String,
        required: true
    },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
  },
  rate:{
      type: Number
  }
    
    });
    
    
    module.exports = mongoose.model('Pharmacies', pharmaciesSchema);