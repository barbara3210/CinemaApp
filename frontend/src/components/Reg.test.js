import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import RegistracijaForma from './registracija'





test('Registracija korisnika',()=>{
    const auth={
        "username": "korisnik5",
        "ime": "Test Kor",
        "pass": "tajna",
        "pass2": "tajna"
     }
    //const testHandler = jest.fn()

   const komponenta=render(<RegistracijaForma username={auth.username} pass={auth.pass} ime={auth.ime} pass2={auth.pass2} />)
   

    const button = komponenta.getByTestId('RegButton')
    fireEvent.click(button)
   
})

afterAll(() => {
    mongoose.connection.close()
  })