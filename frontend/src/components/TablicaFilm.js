import React, {useState,useEffect} from 'react';
import filmAkcije from '../services/filmovi';
import Film from './Film';
import '../styles.css'

const TablicaFilm = () =>{

    const [ film, postaviFilm ] = useState([])

    useEffect( () => {
     
        filmAkcije.dohvatiSve()
      
        .then(res => postaviFilm(res.data))
      
      }, []);

    return(
        <table  className='table table-hover table-dark'>
                    <thead>
                        <tr>
                            <th>Naslov</th>
                            <th>Vrijeme</th>
                            <th>Opis</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                      
                         {film.map((k) => <Film
                         key={k.id}
                         naslov={k.naslov}
                         vrijemePrikazivanja={k.vrijemePrikazivanja}
                         opis={k.opis}                       
                            
                            
                            />)}
                        
                    </tbody>
                    <tfoot>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                        </tr>
                    </tfoot>

                  </table>
    )
    

};
export default TablicaFilm;