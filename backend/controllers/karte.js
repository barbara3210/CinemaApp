const karteRouter = require('express').Router()
const Karta = require('../models/karta')
const Korisnik = require('../models/korisnik')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const dohvatiToken = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}


//GET(read)
karteRouter.get('/', async (req, res) => {
    const token=dohvatiToken(req)
    if(token){
        const dekodiraniToken=jwt.verify(token,process.env.SECRET)
        if(!token||!dekodiraniToken.id){
            return res.status(401).json({error:'Neispravni token'})
        }
        const logiraniKorisnik=await Korisnik.findById(dekodiraniToken.id)
        const karte=await Karta.find({})
        if(karte.length===0){
            return res.status(400).json({error:'Nema karata'})
        }
        const dohvatiKate=await karte.map((k)=>{
            if(logiraniKorisnik._id==k.korisnik.valueOf()){
                return k
            }
        })
        var filtrirano=dohvatiKate.filter(function(el){
            return el!=null
        })
        res.json(filtrirano)
    }
  else{

  }
  
})

//PUT(update)
karteRouter.put('/:id', (req, res, next) => {
    const podatak = req.body
    const id = req.params.id
   
    const karta = new Karta({
        _id:id,
        vrijemePrikazivanja:podatak.vrijemePrikazivanja,
        datum:new Date(),
        brSjedala:podatak.brSjedala
        
      })
  
     Karta.findByIdAndUpdate(id,karta, {new: true})
    .then( novaKarta => {
      res.json(novaKarta)
    })
    .catch(err => next(err))
})

//DELETE
karteRouter.delete('/:id', async (req, res) => {
    const token = dohvatiToken(req)
    const id = req.params.id
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
      return res.status(401).json({error: 'Neispravni token'})
    }
    
    const korisnik = await Korisnik.findById(dekToken.id)
    const originalniPodatak = await Karta.findById(id)
    if (String(korisnik._id) !== String(originalniPodatak.korisnik)) {
        return res.status(401).json({ error: "niste autor podatka" })
    }

    //remove
    await Karta.findByIdAndRemove(id)

    //remove id
    korisnik.podaci = korisnik.karte.filter(p => String(p) != String(originalniPodatak._id))
    await korisnik.save()

    res.status(204).end()
})

//POST(create)
karteRouter.post('/', async (req, res, next) => {
  const podatak = req.body
  const token = dohvatiToken(req)

  const dekToken = jwt.verify(token, process.env.SECRET)
  if (!token || !dekToken.id){
    return res.status(401).json({error: 'Neispravni token'})
  }
  const korisnik = await Korisnik.findById(dekToken.id)
  if(korisnik){
    const dt=new Date()
    //let sati=datum.getHours()+':'+datum.getMinutes()
    const prikazivanje=podatak.vrijemePrikazivanja.split(":")
    const karta=new Karta({
        film:podatak.film,
        vrijemePrikazivanja:podatak.vrijemePrikazivanja,
        datum:new Date(),
        brSjedala:podatak.brSjedala,
        korisnik:korisnik._id
    })
    if(!podatak.film){
        return res.status(400).json({
            error:'Unesi film'
        })
    }
    if(prikazivanje[0]<dt.getHours()&& podatak.datum<dt.getDate()){
        return res.status(400).json({
            error:'Taj film je prošao'
        })
    }
    if(!podatak.brSjedala){
      return res.status(400).json({
          error:'Nije odabrano sjedalo'
      })
    
  }
  

    const spremljenaKarta = await karta.save()
  korisnik.karte = korisnik.karte.concat(spremljenaKarta._id)
  await korisnik.save()

  res.json(spremljenaKarta)

  }
  else{
    error:'Ne postoji korisnik'
  }
  
})

module.exports = karteRouter