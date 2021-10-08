class cart {
    addItem(item) {
        //Récupération du panier dans le localStorage
        let localCart = [];
        if (localStorage.cart) {
            localCart = JSON.parse(localStorage.cart);
        }
        //Si le panier du localStorage n'est pas vide
        if (localCart.length) {
            let modified = false;
            localCart.forEach(element => {
                if (element.id === item.id) {
                    element.quantity += item.quantity;
                    modified = true;
                }
            });
            if (!modified) {
                localCart.push(item);
            }
            localStorage.setItem("cart", JSON.stringify(localCart));
        } else {
            localCart.push(item);
            localStorage.setItem("cart", JSON.stringify(localCart));
        }
    }

    removeItem(id) {
        //Récupération du panier dans le localStorage
        let localCart = [];
        if (localStorage.cart) {
            localCart = JSON.parse(localStorage.cart);
        }
        localCart.forEach(function (element, index) {
            if (element.id === id) {
                localCart.splice(index, 1);
            }
        });
        if (localCart.length) {
            localStorage.setItem("cart", JSON.stringify(localCart));
        } else {
            localStorage.removeItem("cart");
        }
    }

    //Récupère tous les articles du panier
    getAllItems() {
        let localCart = [];
        if (localStorage.cart) {
            localCart = JSON.parse(localStorage.cart);
        }
        return localCart;
    }

    //Récupère le nombre total d'items dans le panier
    getItemsCount() {
        let localCart = [];
        if (localStorage.cart) {
            localCart = JSON.parse(localStorage.cart);
        }
        if (localCart.length) {
            let total = 0;
            localCart.forEach(element => {
                total += element.quantity;
            });
            return total;
        } else {
            return 0;
        }
    }

    //Récupère les ID des produits à commander
    getIdsForOrder() {
        let localCart = [];
        let products = [];
        if (localStorage.cart) {
            localCart = JSON.parse(localStorage.cart);
        }
        if (localCart.length) {
            localCart.forEach(element => {
                for (let i = 0; i < element.quantity; i++) {
                    products.push(element.id);
                }
            });
        }
        return products;
    }

    //Affiche le nombre d'articles dans le menu
    displayNbArticles(target) {
        let nbArticlesCount = this.getItemsCount();
        if (nbArticlesCount) {
            target.classList = "badge rounded-pill bg-danger";
            target.textContent = nbArticlesCount;
        } else {
            target.classList = "badge rounded-pill bg-danger d-none";
        }
    }
}

//Classe d'un objet présent dans le panier
class cartItem {
    set(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}