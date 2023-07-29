const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

test('filmovi se vraćaju kao JSON', async () => {
 await api
 .get('/api/filmovi')
 .expect(200)
 .expect('Content-Type', /application\/json/)
})


// test('dodavanje filma', async () => {
//     const film = {
//     naslov: 'Harry Potter',
//     vrijemePrikazivanja: '19:05',
//     opis:'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.'
//     }
//     await api
//     .post('/api/filmovi')
//     .send(film)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
   
//    })

afterAll(() => {
    mongoose.connection.close()
   })
   