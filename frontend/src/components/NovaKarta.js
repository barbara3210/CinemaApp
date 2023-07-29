import React, {useState,useEffect, Component} from 'react';
import kartaAkcije from '../services/karte';
import filmAkcije from '../services/filmovi';
import Form from "react-bootstrap/Form";
import BootstrapDatePickerComponent from "./Datum";
import LoginAkcije from '../services/login';
import matrica from "../images/SjedalaMatrica.png";
import "../styles.css"
import "./img.css"
import {  BrowserRouter as Router,  Routes,  Route,Link  } from "react-router-dom";
import LoginForma from './LoginForma';
import TablicaKarta from './TablicaKarta';
import Login from '../services/login';

const Slika = () => {
	return (
		<div>
            <br/>
            <img src={require('../images/SjedalaMatrica.png')} width="300" height="200"/>
            
		    
		</div>
	)
}

const NovaKarta=(props)=>{
    const [film, postaviFilm] = useState([]);
    const [naslov, postaviNaslov] = useState(postaviFilm[0]);
    const [vrijemePrikazivanja,postaviVrijeme]=useState("");
    const [brSjedala, postaviSjedalo] = useState("1");
    const [red,postaviRed]=useState("A");
    const [mjesto,postaviMjesto]=useState("");
    const [korisnik, postaviKorisnika] = useState(null);
    const [startDate, setStartDate] = useState(new Date());


    console.log(film)       

    useEffect(()=>{

        
        const logiraniKorisnikJSON = window.localStorage.getItem(
            "prijavljeniKorisnik"
          );
          if(logiraniKorisnikJSON){
            const korisnik = JSON.parse(logiraniKorisnikJSON);
            postaviKorisnika(korisnik)
            
          }  
              
    },[])
    useEffect(()=>{

        filmAkcije.dohvatiSve()
      
        .then(res => postaviFilm(res.data))

    },[postaviFilm])

    //SJEDALO
    const Pmjesto = (e) =>{
        postaviMjesto(red+brSjedala)
        
     }
     
     let date=new Date();

     //FILM
     const odabirFilma=(e)=>{
        
        console.log("Promjena filma", e)
        const podaci = e.split("#")
        console.log(podaci)
         postaviNaslov(podaci[0])
         postaviVrijeme(podaci[1])
         console.log(e.naslov)
         
     }
    
    
    const kupiKartu=async(e)=>{
        e.preventDefault();

        window.localStorage.setItem(
            "prijavljeniKorisnik",
            JSON.stringify(korisnik)
          );
          postaviKorisnika(korisnik);


        if(korisnik!=null){
            kartaAkcije.postaviToken(korisnik.token);
            const noviObjekt = {
                
                film: naslov,
                vrijemePrikazivanja: vrijemePrikazivanja,
                datum: startDate,
                brSjedala: mjesto
                }
            
                await kartaAkcije.stvori(noviObjekt)
               
                alert("Rezervirana karta")
            
            postaviRed("");
            postaviSjedalo("");
            postaviVrijeme("");
         
            

        }
        else{
            alert("Login!")
        }

    }





    return(

     <div className="container">
        
    {(korisnik!==null)?(
        <Form onSubmit={kupiKartu}>
        <h3> Rezerviraj kartu </h3>
    
            <Form.Group className="mb-3" >
            <Form.Label>Odaberi film</Form.Label>
            <Form.Select aria-label="Film" onChange={(e)=>odabirFilma(e.target.value)}>
                {film.map((opt)=>(
                                
                    <option key={opt.id} value={opt.naslov+"#"+opt.vrijemePrikazivanja}>{opt.naslov}({opt.vrijemePrikazivanja})</option>
                )
                )}
                <option>Film</option>
              
            </Form.Select>
          
            <BootstrapDatePickerComponent 
            selected={new Date()}
            onChange={date => setStartDate(date)}
            minDate={date} />

            {/* <Form.Label>Odaberi vrijeme</Form.Label>
            <Form.Select aria-label="Vrijeme prikaza">
                <option value={film.vrijemePrikazivanja}>{film.vrijemePrikazivanja}</option>
                {film.map((opt)=>(
                                
                    <option key={opt.id} value={opt.vrijemePrikazivanja}>{opt.vrijemePrikazivanja}</option>
                )
                )}
                
                onChange={(e) => postaviVrijeme(e.target.value)}
            </Form.Select> */}

            
            
                <Form.Label>Odaberi red</Form.Label> 
                
                <Form.Select aria-label="Red sjedala" onChange={(e)=>postaviRed(e.target.value)}  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                    <option>H</option>
                </Form.Select>

                <Form.Label>Odaberi broj sjedala</Form.Label>
               
                <Form.Select aria-label="Broj sjedala" onChange={(e)=>postaviSjedalo(e.target.value)} >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>

                </Form.Select>
                
                <Slika/>
                
           
            </Form.Group>   
            {/* <a href="/karte" class="btn btn-primary" type='submit'>Rezerviraj</a>
            <Routes>
                <Route path='/karte' element={<TablicaKarta/>}></Route>
            </Routes> */}
            <button data-testid="RegButton" onClick={Pmjesto} className="btn btn-primary btn-block" type="submit">Rezerviraj</button>
           
        
            
        </Form>           
        
               
            
            ):( 
                
                <Link  to="/login" onClick={<LoginForma/>}>Prijavite se</Link>

                )}
        </div>
    
   )};


export default NovaKarta