//Récupération des éléments
const mainContainer = document.getElementById("orderContainer");
const loader = document.getElementById("loader");
const orderId = document.getElementById("orderId");
const nameField = document.getElementById("name");
const firstnameField = document.getElementById("firstName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const mail = document.getElementById("mail");
const orderItems = document.getElementById("orderItems");
const totalPriceElem = document.getElementById("totalPrice");

//Récupération de la commande
try {
    const order = JSON.parse(localStorage.order);
    //Affichange de l'ID de commande
    order.orderId ? orderId.textContent = order.orderId : orderId.textContent = "";
    //Affichange du contact
    if (order.contact) {
        firstnameField.textContent = order.contact.firstName;
        nameField.textContent = order.contact.firstName + " " + order.contact.lastName + ",";
        address.textContent = order.contact.address + ",";
        city.textContent = order.contact.city;
    }
    order.contact.email ? mail.textContent = order.contact.email : mail.textContent = "";
    //Création d'une variable pour le calcul du prix total
    let totalPrice = 0;
    //Création d'une variable afin de vérifier qu'un produit a déjà été ajouté au résumé (calcul des quantités)
    let alreadyChecked = [];
    //Si les produits existent et qu'il s'agit d'un tableau
    if (order.products && Array.isArray(order.products)) {
        order.products.forEach(element => {
            //Si le produit n'a pas déjà été affiché
            if (!alreadyChecked.find(item => item === element._id)) {
                //On l'ajoute aux produits vérifiés
                alreadyChecked.push(element._id);
                //On détermine sa quantité
                let quantity = order.products.filter(prod => prod._id === element._id).length;
                //On actualise le prix total
                totalPrice += element.price * quantity;
                //On créée les éléments d'affichage
                const row = document.createElement("tr");
                const imgCell = document.createElement("td");
                const img = document.createElement("img");
                const nameCell = document.createElement("td");
                const priceCell = document.createElement("td");
                const quantityCell = document.createElement("td");
                //On définie les propriétés des éléments
                imgCell.classList = "d-none d-md-table-cell";
                img.className = "rounded-circle";
                img.width = "40";
                img.height = "40";
                nameCell.className = "align-middle";
                priceCell.className = "align-middle";
                quantityCell.className = "align-middle";
                //On peuple les éléments
                img.alt = element.name;
                img.src = element.imageUrl;
                nameCell.textContent = element.name;
                priceCell.textContent = new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                }).format(element.price / 100);
                quantityCell.textContent = quantity;
                //On hierarchise les éléments
                imgCell.appendChild(img);
                row.appendChild(imgCell);
                row.appendChild(nameCell);
                row.appendChild(priceCell);
                row.appendChild(quantityCell);
                //On ajoute les éléments à la page
                orderItems.appendChild(row);
            }
        });
        //On affiche pour finir le prix total
        totalPriceElem.textContent = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(totalPrice / 100);
        //On supprime le loader et on affiche le résultat
        loader.className = "d-none";
        mainContainer.classList = "container mt-5 text-center";
        //On supprime le panier et la commande
        localStorage.cart ? localStorage.removeItem("cart") : false;
        localStorage.order ? localStorage.removeItem("order") : false;
    }
} catch (error) {
    console.error(error);
    loader.className = "d-none";
    mainContainer.classList = "container mt-5 text-center";
    mainContainer.innerHTML = "";
    let errorMessage = new Alert("Oh non ! Une erreur est survenue !", "Vous n'avez peut-être rien commandé ou nous rencontrons un problème...");
    errorMessage.appendTo("orderContainer", 0);
}