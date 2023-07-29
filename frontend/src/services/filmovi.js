import axios from 'axios'
const osnovniUrl = 'http://localhost:3001/api/filmovi'
const urlRegister = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

const dohvatiSve = async () => {   
  
    const odgovor = await axios.get(osnovniUrl);
    return odgovor
}

export default {dohvatiSve}