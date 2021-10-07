//Définition de la classe Connector permettant l'interfacage avec l'API
class Connector {
    constructor() {
        this.url = "http://localhost:3000/api/cameras";
    }

    //Récupère une caméra par son ID
    getCamById(id) {
        return new Promise((resolve, reject) => {
            fetch(this.url + "/" + id).then(response => {
                resolve(response.json());
            }).catch(error => {
                reject(error);
            });
        })
    }

    //Récupération de toutes les caméras et envoi de la promesse en résultat
    getAllCams() {
        return new Promise((resolve, reject) => {
            fetch(this.url).then(response => {
                resolve(response.json());
            }).catch(error => {
                reject(error);
            });
        })
    }

    order(contact, products) {
        const data = {
            "contact": contact,
            "products": products
        }
        const url = this.url + "/order";
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                resolve(response.json());
            }).catch(error => {
                reject(error);
            });
        });
    }
}