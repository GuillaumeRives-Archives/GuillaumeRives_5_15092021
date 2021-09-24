//Création de l'objet Connector pour requêter l'API
const APIConn = new Connector();

//Création d'une requete de récupération de tous les appareils
const requestCams = APIConn.getAllCams();

//Récupère et affiche le nombre d'articles dans le panier
const Cart = new cart();

function displayNbArticles(target) {
    let nbArticlesCount = Cart.getItemsCount();
    if (nbArticlesCount) {
        target.classList = "badge rounded-pill bg-danger";
        target.textContent = nbArticlesCount;
    } else {
        target.classList = "badge rounded-pill bg-danger d-none";
    }
}
const nbArticles = document.getElementById("nbArticles");
displayNbArticles(nbArticles);

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
        console.error("Erreur au chargement des produits");
        let errMessage = new Alert("Oups, une erreur est survenue", "Nous n'avons plus de produits disponibles ou nous rencontrons un problème...");
        errMessage.appendTo("cameras");
    }
})