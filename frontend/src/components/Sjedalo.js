import React, {useContext,useState,useEffect} from 'react'
import filmAkcije from '../services/filmovi';
import kartaAkcije from '../services/karte';
//import MovieContext from "../contexts/MovieContext"


const Sjedalo = (props) => {
    const [brSjedala, postaviSjedalo] = useState("1");
    const [red,postaviRed]=useState("A");
    const [mjesto,postaviMjesto]=useState("");

    useEffect( () => {
     
        kartaAkcije.dohvatiSve()
        .then(res => postaviFilm(res.data))
      
      }, []);

   



    return (
        <div>
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
        </div>
    )
}

export default Seat