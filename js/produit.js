//Création de l'objet Connector pour requêter l'API
const APIConn = new Connector();

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
        const prodOptions = document.getElementById("camOptionsItems");
        const addButton = document.getElementById("addButton");
        backImage.src = response.imageUrl;
        descImage.src = response.imageUrl;
        prodTitle.textContent = response.name;
        prodDesc.textContent = response.description;
        prodPrice.textContent = response.price / 100 + "€";
        addButton.href = "panier.html?id=" + response._id;
        response.lenses.forEach(option => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            item.appendChild(link);
            link.className = "dropdown-item";
            link.href = "#";
            link.setAttribute("onclick", "showOption(this)");
            link.textContent = option
            prodOptions.appendChild(item);
        });
        card.classList = "card p-2 shadow";
    } else {
        //Sinon, on inscrit le code erreur dans la console et sur la page
        console.log("ERROR : " + response);
        let errMessage = new Alert(response, "alert-danger");
        const card = document.getElementById("cardContent");
        card.classList = "card p-2 shadow d-none";
        errMessage.appendTo("camInfo");
    }
});

//Affichage des options
function showOption(element) {
    const camOptionsButton = document.getElementById("camOptions");
    camOptionsButton.textContent = element.textContent;
}