class productsBadge {
    constructor(badge, quantity) {
        this.badge = badge;
        this.quantity = quantity;
    }

    display() {
        //Récupération du badge d'affichage du nombre de produits
        const parent = document.getElementById(this.badge);
        //Si qu'un seul produit en stock, info au singulier
        let content = " appareils";
        if (this.quantity <= 1) {
            content = " appareil";
        }
        //Peuplement du badge d'affichage du nombre de produits
        parent.classList = "badge rounded-pill bg-danger fs-6 mt-4";
        parent.value = this.quantity;
        parent.textContent = this.quantity + content;
    }
}