const bcrypt = require('bcrypt')
const korisniciRouter = require('express').Router()
const Korisnik = require('../models/korisnik')
const jwt = require('jsonwebtoken')


//ispisuje korisnike
korisniciRouter.get('/', async (req, res) => {
    const korisnici = await Korisnik.find({}).populate('karte')
    res.json(korisnici)
  })
//dodaje korisnike
korisniciRouter.post('/', async (req, res) => {
    const sadrzaj = req.body
    
    const runde = 10
    const passHash = await bcrypt.hash(sadrzaj.pass, runde)

    const korisnik = new Korisnik({
        username: sadrzaj.username,
        ime: sadrzaj.ime,
        passHash: passHash,
        _id:sadrzaj._id
    })
    const postoji=await Korisnik.find(korisnik)
    if(postoji!==null){
        res.status(400).json({error:'Korisnik već postoji'})
    }
    await korisnik.save((err)=>{
        if(err){
            return console.log(err)
        }
        else{
            return console.log("Registrirani ste")
        }
    })
    const userToken = {
        username: korisnik.username,
        id: korisnik._id
    }
    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200).send({
        token, username: korisnik.username, ime: korisnik.ime
    })
    res.status(200).send({
        token:token, username:korisnik.username, ime:korisnik.ime, _id:korisnik._id
    })
    
})

module.exports = korisniciRouter