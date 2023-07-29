const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
  naslov: {
    type: String,
    required: true
  },
  vrijemePrikazivanja: {
    type: String,
    required: true
  },
  opis: {
    type: String,
    required:true
  },
  karta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Karta"
  }
})

filmSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

const Film = mongoose.model('Film', filmSchema, 'filmovi');

module.exports = Film

//module.exports = mongoose.model('Film', filmSchema, 'filmovi')
