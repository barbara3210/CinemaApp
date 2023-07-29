import React, {useState,useEffect} from 'react';
import kartaAkcije from '../services/karte';
import Karte from './Karte';
import '../styles.css'


const TablicaKarta = () =>{

    const [ karta, postaviKartu ] = useState([])
    const [ korisnik, postaviKorisnika ] = useState(null)

    useEffect( () => {
     
        const logiraniKorisnikJSON = window.localStorage.getItem(
            "prijavljeniKorisnik"
          );
          if(logiraniKorisnikJSON){
            const korisnik = JSON.parse(logiraniKorisnikJSON);
            postaviKorisnika(korisnik)
            kartaAkcije.dohvatiSve()
            console.log(korisnik)
          }  
          
      
      }, [postaviKorisnika]);


      useEffect(()=>{
        
        kartaAkcije.dohvatiSve()
      

        .then(res => postaviKartu(res.data))
        console.log(karta)

      }, []);

      
    const  matrix = [
            'a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12',
            'b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12',
            'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12',
            'd1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12',
            'e1','e2','e3','e4','e5','e6','e7','e8','e9','e10','e11','e12',
            'f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12',
            'g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12',
            'h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12'
             ];


    const brisiKartu=(id)=>{
        try{
            kartaAkcije.brisi(id).then(res=>{postaviKartu(karta.filter((k)=>k.id!==id))})
        }
        catch{
            alert("Pogreška pri brisanju")
        }
    }

    const urediKartu=(id)=>{
        const odabranaKarta=karta.find(k=>k.id===id)
        console.log(odabranaKarta)
        const pocetnoSjedalo=odabranaKarta.brSjedala
        const novoSjedalo = prompt("Promjenite sjedalo (pr. A8)", pocetnoSjedalo);

        if (novoSjedalo !== null && matrix.includes(novoSjedalo.toString().toLocaleLowerCase())){

            console.log(novoSjedalo)

            const modificiranaKarta={
                ...odabranaKarta,
                brSjedala:novoSjedalo==null?pocetnoSjedalo:novoSjedalo.toString().toUpperCase()
            }
            kartaAkcije.osvjezi(id,modificiranaKarta).then((res)=>{
                //postaviKartu(karta.filter((k)=>k.id!==id))
                postaviKartu(karta.map((p)=>(p.id!==id?p:res.data)))
            })

        }
        else{
            alert("Neispravan unos")
            

        }

    }


    return(
        <table  className='table table-hover table-dark'>
                    <thead>
                        <tr>
                            <th>Naslov</th>
                            <th>Vrijeme</th>
                            <th>Sjedalo</th>
                            <th></th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                      
                         {karta.map((k) => <Karte
                         key={k.id}
                         naslov={k.film}
                         vrijemePrikazivanja={k.vrijemePrikazivanja}
                         brSjedala={k.brSjedala}              
                         
                         brisi={()=>brisiKartu(k.id)}
                         uredi={()=>urediKartu(k.id)}
                            
                            
                            />)}
                        
                    </tbody>
                    <tfoot>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                        </tr>
                    </tfoot>

                  </table>
    )
    

};
export default TablicaKarta;