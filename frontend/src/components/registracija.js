import React, {useState,useEffect} from 'react';
import registracijaAkcije from '../services/registracija';
import kartaAkcije from '../services/karte';
import Form from "react-bootstrap/Form";
import { Link, Route, Routes } from 'react-router-dom';
import './login.css'
import TablicaFilm from './TablicaFilm';




const RegistracijaForma = () =>{
    const [username, postaviUsername] = useState("");
    const [ime,postaviIme]=useState("");
    const [pass, postaviPass] = useState("");
    const [pass2,postaviPass2]=useState("");
    const [korisnik, postaviKorisnika] = useState(null);
    
    useEffect(() => {
        const logiraniKorisnikJSON = window.localStorage.getItem(
          "prijavljeniKorisnik"
        );
        if(logiraniKorisnikJSON){
          const value = JSON.parse(logiraniKorisnikJSON);
          postaviKorisnika(value)
          
        }  
        
      }, []);
      window.onunload=function(){
        localStorage.removeItem('prijavljeniKorisnik');
      }
      const promijeniPass2 = (e) =>{
        postaviPass2(e.target.value)
      }
    const userRegistracija = async (e) => {
      e.preventDefault();
      if(pass2===pass){
        const korisnik = await registracijaAkcije.registracija({
            username,
            ime,
            pass
            
          });
          window.localStorage.setItem(
            "prijavljeniKorisnik",
            JSON.stringify(korisnik)
          );
        kartaAkcije.postaviToken(korisnik.token);
        postaviKorisnika(korisnik);
        postaviUsername("");
        postaviIme("");
        postaviPass("");
        alert("Uspješna registracija")
      }
      else{
        alert("Imate razlicite lozinke!")
      }
    };
    return(
    <div className="container">
        {(korisnik===null)?(
            <Form onSubmit={userRegistracija}>
                <h3> Registriraj se </h3>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Korisničko ime: </Form.Label>
                  <Form.Control type="text" value={username} name="Username"  placeholder="...unesite UserName" className="form-control" onChange={(e)=>postaviUsername(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ime i prezime: </Form.Label>
                <Form.Control type="text" value={ime} name="Ime"  placeholder="...unesite ime i prezime" className="form-control" onChange={(e)=>postaviIme(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" value={pass} name="Pass" placeholder="...unesite password" className="form-control" onChange={(e)=>postaviPass(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ponovite lozinku: </Form.Label>
                <Form.Control type="password" value={pass2} name="Pass" placeholder="...ponovite password" className="form-control" onChange={promijeniPass2}></Form.Control>
            </Form.Group>
            
            
            
            
          
            <button data-testid="RegButton" className="btn btn-primary btn-block" type="submit">Registriraj se</button> 

            {/* <a href="/home" class="btn btn-primary" type='submit'>Registracija</a>
            <Routes>
                <Route path='/home' element={<TablicaFilm/>}></Route>
            </Routes> 
            */}
     

        </Form>):( 
            <h2>Dobrodošli</h2>
            )}
    </div>
    
  )};
  
  export default RegistracijaForma;