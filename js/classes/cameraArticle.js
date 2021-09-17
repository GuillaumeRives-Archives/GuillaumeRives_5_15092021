class CameraArticle {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    appendTo(parent) {
        //Récupération de l'élément parent
        const origin = document.getElementById(parent);

        //Création des éléments d'un article
        const article = document.createElement("article");
        const image = document.createElement("img");
        const articleBody = document.createElement("div");
        const title = document.createElement("h2");
        const price = document.createElement("span");
        const button = document.createElement("a");

        //Ajout des propriétés aux éléments
        article.classList = "card shadow-sm mt-3 rounded-3 p-1";
        image.className = "card-img-top";
        articleBody.className = "card-body";
        title.classList = "card-title fs-5";
        price.classList = "card-text text-muted fst-italic";
        button.classList = "btn btn-primary d-block w-100 mt-2";

        //Peuplement des éléments avec leurs valeurs
        image.src = this.imageUrl;
        image.alt = this.name;
        image.height = 150;
        title.textContent = this.name;
        price.textContent = this.price / 100 + "€";
        button.href = "panier.html?id=" + this.id;
        button.textContent = "En savoir plus";

        //Constitution de la hierarchie des éléments
        article.appendChild(image);
        article.appendChild(articleBody);
        articleBody.appendChild(title);
        articleBody.appendChild(price);
        articleBody.appendChild(button);

        //Ajout des éléments dans le conteneur parent
        origin.appendChild(article);
    }
}