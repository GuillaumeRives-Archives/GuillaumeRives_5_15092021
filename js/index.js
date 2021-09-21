//Création de l'objet Connector pour requêter l'API
const APIConn = new Connector();

//Création d'une requete de récupération de tous les appareils
const requestCams = APIConn.getAllCams();

//Lorsque la réponse est récupérée
requestCams.then(response => {
    //S'il s'agit d'un tableau de résultats
    if (Array.isArray(response)) {
        //On affiche chaque caméra sur la page
        response.forEach(camera => {
            let article = new CameraArticle(camera._id, camera.name, camera.price, camera.imageUrl);
            article.appendTo("cameras");
        });

        //Affichage du badge de quantité de produits
        const badge = new productsBadge("nbProducts", response.length);
        badge.display();

    } else if (response._id) {
        let article = new CameraArticle(response._id, response.name, response.price, response.imageUrl);
        article.appendTo("cameras");

        //Affichage du badge de quantité de produits
        const badge = new productsBadge("nbProducts", 1);
        badge.display();

    } else {
        //Sinon, on inscrit le code erreur dans la console et sur la page
        console.log("ERROR : " + response);
        let errMessage = new Alert(response, "alert-danger");
        errMessage.appendTo("cameras");
    }
})