
import React, {} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import RegistracijaForma from './components/registracija'
import LoginForma from './components/LoginForma'
import NovaKarta from './components/NovaKarta'
import TablicaFilm from './components/TablicaFilm'
import Logo from './components/Logo';
import 'bootstrap/dist/css/bootstrap.css';
import {  BrowserRouter as Router,  Routes,  Route,Link  } from "react-router-dom";
import "./styles.css";
import "./index.css"
import TablicaKarta from './components/TablicaKarta';
import NavDropdown from 'react-bootstrap/NavDropdown';




//const API_URL="https://api.themoviedb.org/3/movie/now_playing?api_key=de081303649f6d21d7fe1e772a221262"

const App = () => {
  
  return (

    <div>

    
    
    <Router>
      <div>
       <Navbar className="navbar navbar-expand-sm mb-5 bg-dark navbar-dark sticky-top">
            <Container fluid="md" >
              {/* <a class="navbar-brand" href="#"><Logo/></a> */}
              <Navbar.Brand href="/"><Logo/></Navbar.Brand> 
              <Nav className="mr-auto" bg="dark">

              <Nav.Item>
                {/* <Nav.Link  href="/" element={<TablicaFilm/>}> Početna </Nav.Link>  */}
                <Link className='m-2' bg="dark" to="/">Početna</Link> 
              </Nav.Item>

              <Nav.Item>
                {/* <Nav.Link  href="/rezervirano" element={<TablicaKarta/>}> Vaše karte </Nav.Link> */}
                <Link className='m-2' to="/rezervirano">Vaše karte</Link> 
                
              </Nav.Item>
              <Nav.Item>                
                 {/* <Nav.Link  href="/login" element={<NovaKarta/>}>Rezerviraj</Nav.Link>  */}
                <Link className='m-2' to="/novaKarta">Rezerviraj kartu</Link>            
              </Nav.Item>
              
              <Nav.Item>
                {/* <Nav.Link  href="/registracija" element={<RegistracijaForma/>}> Novi </Nav.Link>  */}
                <Link className='m-2' to="/registracija">Novi korisnik</Link>  
                
              </Nav.Item>
              <Nav.Item>                
                {/* <Nav.Link  href="/login" element={<LoginForma/>}> Prijavi se </Nav.Link>  */}
                <Link className='m-2' to="/login">Prijavite se</Link>            
              </Nav.Item>


              {/* <NavDropdown title="Karte" id="basic-nav-dropdown">
              <NavDropdown.Item href="/novaKarta">
                <Link className='m-2' to="/novaKarta">Rezerviraj kartu</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="/rezervirano">
                <Link className='m-2' to="/rezervirano">Rezervirano</Link>
              </NavDropdown.Item>          
              
            </NavDropdown> */}


              {/* <Nav.Item>
                
                <Link className='m-2' to="/novaKarta">Rezerviraj kartu</Link>
              </Nav.Item>  
              <Nav.Item>
           
                <Link className='m-2' to="/rezervirano">Karte</Link>
              </Nav.Item>   */}



             
                
              </Nav>
            </Container>
          </Navbar> 

        <Routes>
          
          <Route path="/home/*" element={<TablicaFilm/>}> </Route>
          <Route path="/login/*" element={<LoginForma/>}> </Route>
          <Route path="/registracija/*" element={<RegistracijaForma/>}> </Route>
          <Route path="//*" element={<TablicaFilm/>}> </Route>
          <Route path="/novaKarta/*" element={<NovaKarta/>}> </Route>
          <Route path="/rezervirano/*" element={<TablicaKarta/>}> </Route> 

        </Routes> 

      
       </div> 
    </Router>  

  </div>
    
  );
}

export default App