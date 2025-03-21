const mongoose = require('mongoose')

const MetaFBASchema = new mongoose.Schema(
    {
    title:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    keywords:{
        type:String,
        require:true
    },
},
{ timeStamps: true }

)

module.exports = mongoose.model('metaFBA', MetaFBASchema )