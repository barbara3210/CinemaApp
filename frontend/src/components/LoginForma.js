import React,{useState,useEffect} from "react";
import loginAkcije from '../services/login';
import kartaAkcije from '../services/karte';
import Form from "react-bootstrap/Form";
import './login.css'

const LoginForma = () => {

  const [username, postaviUsername] = useState("");
  const [pass, postaviPass] = useState("");
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

  const userLogin=async(e)=>{
    e.preventDefault();
    try {
      const korisnik = await loginAkcije.prijava({
        username,
        pass,
      });
      window.localStorage.setItem(
        "prijavljeniKorisnik",
        JSON.stringify(korisnik)
      );
      kartaAkcije.postaviToken(korisnik.token);
      postaviKorisnika(korisnik);
      postaviUsername("");
      postaviPass("");
      
    } catch (exception) {
      alert("Neispravni podaci");
    

  }
  }
return(
  <div className="container">
        {(korisnik===null)?(
            <Form onSubmit={userLogin}>
                <h3> Prijavi se </h3>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Korisničko ime: </Form.Label>
                  <Form.Control type="text" value={username} name="Username"  placeholder="...unesite UserName" className="form-control" onChange={(e)=>postaviUsername(e.target.value)} ></Form.Control>
            </Form.Group>          
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" value={pass} name="Pass" placeholder="...unesite password" className="form-control" onChange={(e)=>postaviPass(e.target.value)}></Form.Control>
            </Form.Group>
                       
            
            
            
          
            <button data-testid="RegButton" className="btn btn-primary btn-block" type="submit">Prijava</button>
        </Form>):( 
            <h2>Dobrodošli</h2>
            )}
    </div>

)}

export default LoginForma;
