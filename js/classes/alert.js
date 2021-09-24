class Alert {
    constructor(title, message) {
        this.title = title;
        this.message = message;
    }

    appendTo(origin, button) {
        const target = document.getElementById(origin);
        const icon = document.createElement("i");
        const alert = document.createElement("div");
        const title = document.createElement("h1");
        const message = document.createElement("p");
        const link = document.createElement("a");
        alert.classList = "inner cover text-center";
        icon.classList = "bi bi-emoji-frown-fill fs-1";
        title.classList = "cover-heading";
        title.textContent = this.title;
        message.classList = "lead";
        message.textContent = this.message;
        link.classList = "btn btn-primary";
        switch (button) {
            case 1:
                link.href = "index.html";
                link.textContent = "Notre selection"
                break;

            default:
                link.href = "mailto:contact@orinocam.com";
                link.target = "_blank";
                link.textContent = "Contactez nous"
                break;
        }
        alert.appendChild(icon);
        alert.appendChild(title);
        alert.appendChild(message);
        alert.appendChild(link);
        target.appendChild(alert);
    }
}