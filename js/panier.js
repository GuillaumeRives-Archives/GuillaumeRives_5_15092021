//Création de l'objet Connector pour requêter l'API
const APIConn = new Connector();

//Création de l'objet de gestion du panier
const Cart = new cart();

//Récupération du formulaire
const form = document.getElementById("orderForm");

//Récupération du loader
const loader = document.getElementById("loader");

//Récupère et affiche le nombre d'articles dans le panier
const nbArticles = document.getElementById("nbArticles");
Cart.displayNbArticles(nbArticles);

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
            const quantContainer = document.createElement("div");
            const quantRemove = document.createElement("button");
            const quantity = document.createElement("p");
            const quantAdd = document.createElement("button");
            const button = document.createElement("button");
            //Ajout des classes aux éléments
            itemContainer.classList = "p-2 col-sm-12 bg-white border rounded shadow-sm mt-3 row align-items-center";
            img.classList = "col-12 col-md-1 rounded border d-sm-none d-md-block p-0";
            title.classList = "col justify-content-center m-2";
            price.classList = "col justify-content-center m-2";
            quantContainer.classList = "col d-flex flex-grow-1 justify-content-center";
            quantity.classList = "align-self-center m-2";
            quantAdd.classList = "btn btn-link text-decoration-none";
            quantAdd.textContent = "+";
            quantRemove.classList = "btn btn-link text-decoration-none";
            quantRemove.textContent = "-";
            button.classList = "col-12 col-sm col-lg-2 btn btn-danger";
            button.textContent = "Supprimer";
            //Hierarchisation des éléments
            itemContainer.appendChild(img);
            itemContainer.appendChild(title);
            itemContainer.appendChild(price);
            quantContainer.appendChild(quantRemove);
            quantContainer.appendChild(quantity);
            quantContainer.appendChild(quantAdd);
            itemContainer.appendChild(quantContainer);
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
                    price.textContent = "Prix unitaire " + new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(response.price / 100);
                    if (element.quantity === 1) {
                        quantRemove.setAttribute("data-bs-toggle", "modal");
                        quantRemove.setAttribute("data-bs-target", "#panierModal");
                        quantRemove.setAttribute("data-bs-itemID", element.id);
                    } else {
                        quantRemove.setAttribute("onclick", "decreaseItem('" + element.id + "')");
                    }
                    quantAdd.setAttribute("onclick", "increaseItem('" + element.id + "')");
                    quantity.textContent = "Quantité " + element.quantity;
                    button.setAttribute("data-bs-toggle", "modal");
                    button.setAttribute("data-bs-target", "#panierModal");
                    button.setAttribute("data-bs-itemID", element.id);
                    target.appendChild(itemContainer);

                    //Affichage du prix total
                    totalPriceDisplay.forEach(element => {
                        element.textContent = "Sous-total (" + totalArticles + " articles) : " + new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(totalPrice / 100);
                    });

                    //Affichage du formulaire
                    form.classList = "row";
                    loader.remove();
                }
            }).catch(error => {
                console.error(error);
                //Sinon, on inscrit le code erreur dans la console et sur la page et on supprime le prix total et le formulaire
                let errMessage = new Alert("Oh non ! Une erreur est survenue !", "Nous rencontrons un problème...");
                errMessage.appendTo("panierList");
                //Suppression des affichages inutiles
                const basketIntro = document.getElementById("basketIntro");
                basketIntro.innerHTML = "";
                totalPriceDisplay.forEach(element => {
                    element.className = "d-none";
                });
                form.classList = "row d-none";
                loader.remove();
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
        form.classList = "row d-none";
        loader.remove();
    }
}

//Gestion du modal de suppression d'un item
const modalDeleteBtn = document.getElementById("modalDeleteBtn");
const modal = new bootstrap.Modal(document.getElementById("panierModal"), {
    keyboard: false
});
document.getElementById("panierModal").addEventListener("show.bs.modal", event => {
    let button = event.relatedTarget;
    modalDeleteBtn.setAttribute("data-bs-itemID", button.getAttribute("data-bs-itemID"));
});
modalDeleteBtn.addEventListener("click", event => {
    let button = event.target;
    let productID = button.getAttribute("data-bs-itemID");
    deleteItem(productID);
    modal.hide();
});

//Affichage du panier
displayCart()

//Fonction du suppression d'un item du panier
function deleteItem(id) {
    Cart.deleteItem(id);
    displayCart();
    Cart.displayNbArticles(nbArticles);
}

//Fonction d'ajout d'un item
function increaseItem(id) {
    Cart.quantAdd(id);
    displayCart();
    Cart.displayNbArticles(nbArticles);
}

//Fonction de soustraction d'un item
function decreaseItem(id) {
    Cart.quantRemove(id);
    displayCart();
    Cart.displayNbArticles(nbArticles);
}

//////////////////////////
// ENVOI D'UNE COMMANDE //
//////////////////////////
form.addEventListener("submit", event => {
    event.preventDefault();
})

const orderBtn = document.getElementById("orderBtn");
if (orderBtn) {
    orderBtn.addEventListener("click", event => {
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
            }).catch(error => {
                console.error(error);
            })
        }
    })
}