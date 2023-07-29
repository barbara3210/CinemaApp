const Korisnik = require('../models/korisnik')
const Karta = require('../models/karta')

const korisnici = [
 // ...
]
const korisniciUBazi = async () => {
 const korisnik = await Korisnik.find({})
 return korisnik.map(p => p.toJSON())
}

const karte = [
    // ...
   ]
   const karteUBazi = async () => {
    const karta = await Karta.find({})
    return karta.map(p => p.toJSON())
   }


module.exports = {
 korisnici, korisniciUBazi, karte, karteUBazi
}
