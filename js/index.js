const APIConn = new Connector();

//Création d'une requete de récupération de toutes les caméras
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
    } else {
        //Sinon, on inscrit le code erreur dans la console et sur la page
        console.log("ERROR : " + response);
        let errMessage = new Alert(response, "alert-danger");
        errMessage.appendTo("cameras");
    }
})