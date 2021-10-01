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

    order(contact, products) {
        const data = {
            "contact": contact,
            "products": products
        }
        console.log(data);
        return fetch(this.url + "/order", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .catch(error => error.message);
    }
}