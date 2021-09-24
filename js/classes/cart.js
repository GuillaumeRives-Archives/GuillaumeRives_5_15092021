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
                if (element.id == item.id) {
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

    }

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
}

class cartItem {
    set(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}