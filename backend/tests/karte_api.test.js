const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const pomocni = require('./test_pomocni')

const api = supertest(app)

const auth={
    "username": "testUser",
    "pass": "tajna",
}

test('Nova karta bez tokena', async () => {
    // const kor=await api.post('/api/login').send(auth)
    // const token=kor.body.token
    
    const karta = {
    naslov: 'Harry Potter',
    vrijemePrikazivanja: '19:05',
    datum:new Date(),
    brSjedala:'C10',
    //korisnikId:kor.body.id
    
}
    await api
    .post('/api/karte')
    .send(karta)
    //.auth(token,{type:'bearer'})
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
   
})

test('Brisanje karte bez tokena', async () => {
    const pocetnoStanje = await pomocni.karteUBazi()
    const obrisi = pocetnoStanje[0]
    const odgovor = await api
    .delete(`/api/karte/${obrisi}`)
    .expect(400)
    const rezultat = await pomocni.karteUBazi()
    expect(rezultat).toHaveLength(pocetnoStanje.length)
    
   })

   test('Brisanje karte s tokenom', async () => {
    const kor=await api.post('/api/login').send(auth)
    const token=kor.body.token
    const pocetnoStanje = await pomocni.karteUBazi()
    const obrisi = pocetnoStanje[0]
  
    
    const odgovor = await api
    .delete(`/api/karte/${obrisi.id}`).auth(token,{type:'bearer'})
    .expect(204)
    const rezultat = await pomocni.karteUBazi()
    expect(rezultat).toHaveLength(pocetnoStanje.length-1)
    const sadrzaj = rezultat.map(p => p.sadrzaj)
    expect(sadrzaj).not.toContain(obrisi)
   })



   afterAll(() => {
    mongoose.connection.close()
   })



   
   