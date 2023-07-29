import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import RegistracijaForma from './registracija'
import LoginForma from './LoginForma'


test('Botun prijava',()=>{
    const auth={
        "username": "testUser",
        "pass": "tajna",
     }
    

   const komponenta=render(<LoginForma username={auth.username} pass={auth.pass} />)
   const logiraniKorisnikJSON = window.localStorage.getItem(
      "prijavljeniKorisnik"
    )
    const korisnik = JSON.parse(logiraniKorisnikJSON);

    const button = komponenta.getByText('Prijava')
    fireEvent.click(button)
   
})


afterAll(() => {
  mongoose.connection.close()
})








