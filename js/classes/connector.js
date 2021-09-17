//Définition de la classe Connector permettant l'interfacage avec l'API
class Connector {
    constructor() {
        this.url = "http://localhost:3000/api/cameras";
    }

    //Récupère une caméra par son ID
    getCamById(id) {
        return fetch(this.url + "/" + id)
            .then(response => response.json())
            .catch(error => error.message);
    }

    //Récupération de toutes les caméras et envoi de la promesse en résultat
    getAllCams() {
        return fetch(this.url)
            .then(response => response.json())
            .catch(error => error.message);
    }
}