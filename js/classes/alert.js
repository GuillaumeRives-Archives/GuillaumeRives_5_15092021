class Alert {
    constructor(message, type) {
        this.message = message;
        this.type = type;
    }

    appendTo(origin) {
        const target = document.getElementById(origin);
        const alert = document.createElement("div");
        const dangerIcon = document.createElement("i");
        alert.classList = "d-block w-100 alert " + this.type;
        dangerIcon.classList = "bi bi-exclamation-triangle-fill";
        dangerIcon.textContent = " " + this.message;
        alert.appendChild(dangerIcon);
        target.appendChild(alert);
    }
}