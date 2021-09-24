//Création de l'objet Connector pour requêter l'API
const APIConn = new Connector();

//Création de l'objet panier pour manipuler le panier
const Cart = new cart();
const CartItem = new cartItem();

//Récupère et affiche le nombre d'articles dans le panier
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

//Récupère les paramètres d'URL
const URLParams = new URLSearchParams(window.location.search);
const ProdID = URLParams.get("id");

//Création d'une requete de récupération de tous les appareils
const requestedCam = APIConn.getCamById(ProdID);

requestedCam.then(response => {
    if (response._id) {
        //Récupération des éléments de la page à peupler
        const card = document.getElementById("cardContent");
        const backImage = document.getElementById("backImage");
        const descImage = document.getElementById("descImage");
        const prodTitle = document.getElementById("prodTitle");
        const prodDesc = document.getElementById("prodDesc");
        const prodPrice = document.getElementById("prodPrice");
        const prodOptions = document.getElementById("prodOptions");
        backImage.src = response.imageUrl;
        descImage.src = response.imageUrl;
        prodTitle.textContent = response.name;
        prodDesc.textContent = response.description;
        prodPrice.textContent = response.price / 100 + "€";
        let optionIndex = 1;
        response.lenses.forEach(option => {
            const optionTag = document.createElement("option");
            optionTag.value = optionIndex;
            optionTag.textContent = option;
            prodOptions.appendChild(optionTag);
            optionIndex++;
        });
        card.classList = "card p-2 shadow";
        //Création d'un élément à rajouter au panier
        CartItem.set(response._id, 1);
    } else {
        //Sinon, on inscrit le code erreur dans la console et sur la page
        console.log("ERROR : " + response);
        let errMessage = new Alert(response, "alert-danger");
        const card = document.getElementById("cardContent");
        card.classList = "card p-2 shadow d-none";
        errMessage.appendTo("camInfo");
    }
});

//Ajout dans le panier
const addButton = document.getElementById("addButton");
const quantity = document.getElementById("prodQuantity");
addButton.addEventListener("click", function () {
    CartItem.quantity = parseInt(quantity.value, 10);
    Cart.addItem(CartItem);
    displayNbArticles(nbArticles);
});