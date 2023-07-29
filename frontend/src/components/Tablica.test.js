import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import TablicaFilm from './TablicaFilm'

test('Dodavanje elemenata',()=>{

const table = document.createElement('th')

const {container} = render(<TablicaFilm/>, {
  container: document.body.appendChild(table),
})
    
})


// test('Sadržaj renderiranja naslov',()=>{

//   const komponenta = render(<TablicaFilm />)

//   const element = komponenta.getByText('Naslov')
//    expect(element).toBeDefined()

// })



afterAll(() => {
  mongoose.connection.close()
})



