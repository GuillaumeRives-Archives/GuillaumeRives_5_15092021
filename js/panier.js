//Création de l'objet Connector pour requêter l'API
const APIConn = new Connector();

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