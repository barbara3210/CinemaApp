import axios from 'axios'

const osnovniUrl = 'http://localhost:3001/api/karte'

let token=null;
const postaviToken=(noviToken)=>{
    token=`bearer ${noviToken}`
}
 
const dohvatiSve = async () => {   
    const config={
        headers:{Authorization:token}
    }
    const odg=await axios.get(osnovniUrl,config)
    return odg;
}
const stvori = async noviObjekt => {
    const config={
        headers:{Authorization:token}
    }
    const odg=await axios.post(osnovniUrl,noviObjekt,config)
    return odg;
    
}
 
const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}

const brisi = async id => {
    const config={
        headers:{Authorization:token}
    }
    return axios.delete(`${osnovniUrl}/${id}`,config)
}
 
export default { postaviToken, dohvatiSve, stvori, osvjezi, brisi}