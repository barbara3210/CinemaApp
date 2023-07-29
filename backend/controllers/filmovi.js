const filmRouter = require('express').Router()
const Film = require('../models/film')
const Karta = require('../models/karta')

filmRouter.get('/', async(req, res) => {
  const filmovi = await Film.find({})
  res.json(filmovi)
})

filmRouter.post('/',async(req,res)=>{

  const podatak = req.body
  
  const film = new Film({
    naslov: podatak.naslov,
    vrijemePrikazivanja: podatak.vrijemePrikazivanja,
    opis: podatak.opis
    
  })
  
  const dodanFilm = await film.save()
  res.json(dodanFilm)

})

module.exports = filmRouter