//Définition de la classe Connector permettant l'interfacage avec l'API
class Connector {
    constructor() {
        this.url = "http://localhost:3000/api/cameras";
    }

    //Récupère une caméra par son ID
    getCamById(id) {
        let fetchCamByID = async (url) => {
            let response = await fetch(url);
            let result = await response.json();
            return result;
        }
        return fetchCamByID(this.url + "/" + id);
    }

    //Récupération de toutes les caméras et envoi de la promesse en résultat
    getAllCams() {
        let fetchCams = async (url) => {
            let response = await fetch(url);
            let result = await response.json();
            return result;
        }
        return fetchCams(this.url);
    }

    order(contact, products) {
        const data = {
            "contact": contact,
            "products": products
        }
        const url = this.url + "/order";
        let fetchOrder = async (url, data) => {
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let result = await response.json();
            return result;
        }
        return fetchOrder(url, data);
    }
}