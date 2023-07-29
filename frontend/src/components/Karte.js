import React, {useState,useEffect} from 'react';
import "../styles.css"

const Karte = (props)=>{
    
   
    return(
        
    
        <tr>
            <td>{props.naslov}</td>
            <td>{props.vrijemePrikazivanja}</td>
            <td>{props.brSjedala}</td>
            <td><button onClick={props.brisi}>Brisi</button>
            <button onClick={props.uredi}>Promjeni</button></td>
            
                    
                    
        </tr>
        
        
    )
}

export default Karte