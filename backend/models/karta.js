const mongoose = require('mongoose')

const kartaSchema = new mongoose.Schema({
  film: {
    type: String,
    ref: "Film"
  },
  vrijemePrikazivanja: {
    type: String,
    required: true
  },
  datum: {
    type: Date
    
  },
  brSjedala: {
    type: String,
    required:true
  },
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Korisnik"
  }
})

kartaSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

const Karta = mongoose.model('Karta', kartaSchema, 'karte');

module.exports = Karta