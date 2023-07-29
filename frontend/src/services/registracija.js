import axios from 'axios'
const osnovniUrl='http://localhost:3001/api/korisnici'

const registracija = async podaci => {
    const odg=await axios.post(osnovniUrl,podaci)
    return odg.data
}
export default {registracija}