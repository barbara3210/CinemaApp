import React, {useState,useEffect} from 'react';
import "../styles.css"

const Film = (props)=>{
    
   
    return(
        
    
        <tr>
            <td>{props.naslov}</td>
            <td>{props.vrijemePrikazivanja}</td>
            <td>{props.opis}</td>
                    
                    
        </tr>
        
        
    )
}

export default Film