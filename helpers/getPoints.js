import axios from 'axios';

export default function getClients() {
    const PORT = process.env.PORT || 3000;

    axios.get(`http://localhost:${ PORT }/api/clients`)
    .then(response => {
        console.log(response.data);

        const clients = response.data;
        const clientsInfo = [];
        
        for (const client in clients) {
            clientsInfo.push({ id: client.id, x: client.coordX, y: client.coordY });
        }

        return clientsInfo
    })
    .catch(error => {
        console.log(error);
    });
}