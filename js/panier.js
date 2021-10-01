//Création de l'objet Connector pour requêter l'API
const APIConn = new Connector();

//Création de l'objet de gestion du panier
const Cart = new cart();

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

///////////////////////
//Affichage du panier//
///////////////////////
function displayCart() {
    //Récupération des items du panier
    let cartItems = Cart.getAllItems();
    //Récupération de la cible pour l'affichage du panier
    const target = document.getElementById("panierList");
    //Récupération de la cible pour l'affichage du prix total
    const totalPriceDisplay = document.querySelectorAll(".totalPrice");
    //Variable pour le prix total
    target.innerHTML = "";

    if (cartItems.length) {
        let totalPrice = 0;
        let totalArticles = 0;
        cartItems.forEach(element => {
            //Création des éléments d'un item
            const itemContainer = document.createElement("div");
            const img = document.createElement("img");
            const title = document.createElement("h5");
            const price = document.createElement("p");
            const quantity = document.createElement("p");
            const button = document.createElement("button");
            //Ajout des classes aux éléments
            itemContainer.classList = "p-2 col-sm-12 bg-white border rounded shadow-sm mt-3 d-flex flex-column flex-sm-row";
            img.classList = "rounded border mx-auto d-block";
            title.classList = "flex-grow-1 align-self-center m-2";
            price.classList = "flex-grow-1 align-self-center m-2";
            quantity.classList = "flex-grow-1 align-self-center m-2";
            button.classList = "btn btn-danger";
            button.textContent = "Supprimer";
            //Hierarchisation des éléments
            itemContainer.appendChild(img);
            itemContainer.appendChild(title);
            itemContainer.appendChild(price);
            itemContainer.appendChild(quantity);
            itemContainer.appendChild(button);
            //Récupération des informations de la caméra à partir de son ID
            const requestedCam = APIConn.getCamById(element.id);
            requestedCam.then(response => {
                if (response._id) {
                    //Mise à jour du prix total
                    totalPrice += (response.price * element.quantity);
                    totalArticles += element.quantity;
                    //Peuplement des valeurs des éléments créés
                    img.src = response.imageUrl;
                    img.alt = response.name;
                    title.textContent = response.name;
                    price.textContent = "Prix unitaire " + response.price / 100 + "€";
                    quantity.textContent = "Quantité " + element.quantity;
                    button.setAttribute("onclick", "removeItem('" + element.id + "')");
                    target.appendChild(itemContainer);

                    //Affichage du prix total
                    totalPriceDisplay.forEach(element => {
                        element.textContent = "Sous-total (" + totalArticles + " articles) : " + totalPrice / 100 + "€"
                    });
                }
            });
        });
    } else {
        //Sinon, on inscrit le code erreur dans la console et sur la page et on supprime le prix total et le formulaire
        console.warn("Panier vide !");
        let errMessage = new Alert("Oh non ! Votre panier est vide !", "Faites vite le plein en consultant notre sélection d'appareils !");
        errMessage.appendTo("panierList", 1);
        //Suppression des affichages inutiles
        const basketIntro = document.getElementById("basketIntro");
        basketIntro.innerHTML = "";
        totalPriceDisplay.forEach(element => {
            element.className = "d-none";
        });
        const form = document.getElementById("orderFormContainer");
        form.innerHTML = "";
    }
}
//Affichage du panier
displayCart()

//Fonction du suppression d'un item du panier
function removeItem(id) {
    Cart.removeItem(id);
    displayCart();
    displayNbArticles(nbArticles);
}

//////////////////////////
// ENVOI D'UNE COMMANDE //
//////////////////////////
const orderBtn = document.getElementById("orderBtn");
orderBtn.addEventListener("click", function (event) {
    event.preventDefault;
    const orderForm = document.getElementById("orderForm");
    if (orderForm.checkValidity()) {
        //Envoi d'une requete POST de commande
        let contact = new Object();
        contact.firstName = document.getElementById("prenom").value;
        contact.lastName = document.getElementById("nom").value;
        contact.address = document.getElementById("adresse").value;
        contact.city = document.getElementById("ville").value;
        contact.email = document.getElementById("email").value;

        let products = Cart.getIdsForOrder();

        const request = APIConn.order(contact, products);
        request.then(response => {
            localStorage.order = JSON.stringify(response);
            window.location = "confirmation.html";
        })
    }
})