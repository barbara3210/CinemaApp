const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const pomocni = require('./test_pomocni')

const api = supertest(app)

test('ispravno vraca pogresku ako vec postoji username', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()
    const novi = {
    username: 'testUser',
    ime: 'Test Korisnik',
    pass: 'tajna'
    }
    const rezultat = await api
    .post('/api/korisnici')
    .send(novi)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    expect(rezultat.body.error).toContain("Korisnik već postoji")
    const svi = await pomocni.korisniciUBazi()
    expect(svi).toHaveLength(pocetniKorisnici.length)
    })


afterAll(() => {
        mongoose.connection.close()
    })
 
      
  