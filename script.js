let form = document.querySelector("section.principal form");
let input = document.querySelector('section.principal form .newItem input[type="text"]');
let ul = document.querySelector("section.principal form ul");
let del = document.querySelector("section.principal form ul li svg");
let error = document.getElementById("error")
let errorLeave = document.getElementById("errorLeave")

document.addEventListener('DOMContentLoaded', loadListFromLocalStorage);


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.length > 0) {
        if (!isItemAlreadyExists(input.value)) {
            createListItem(input.value);
            saveListToLocalStorage();
        } else {
            alert("Item já existe!");
        }
    } else {
        alert("é obrigatório digitar algo!");
    }

    input.value = "";
});




errorLeave.addEventListener("click", (e) => {
    error.classList.remove("show-alert")
    error.classList.add("delete")

})




























function isItemAlreadyExists(name) {
    const items = ul.querySelectorAll("li");

    for (let item of items) {
        const h2 = item.querySelector("h2");
        if (h2 && h2.textContent.trim().toLowerCase() === name.trim().toLowerCase()) {
            return true;
        }
    }

    return false;
}











function createListItem(name) {
    const li = document.createElement("li");
    li.classList.add(name)

    const div = document.createElement("div");
    div.classList.add("checkName");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = name;

    const label = document.createElement("label");
    label.setAttribute("for", name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(h2);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("trash");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "17");
    svg.setAttribute("viewBox", "0 0 16 17");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M13 4.16666L12.5869 10.8501C12.4813 12.5576 12.4285 13.4114 12.0005 14.0253C11.7889 14.3287 11.5165 14.5849 11.2005 14.7773C10.5614 15.1667 9.706 15.1667 7.99513 15.1667C6.28208 15.1667 5.42553 15.1667 4.78603 14.7766C4.46987 14.5838 4.19733 14.3272 3.98579 14.0232C3.55792 13.4084 3.5063 12.5534 3.40307 10.8435L3 4.16666");
    path1.setAttribute("stroke", "#6B6671");
    path1.setAttribute("stroke-linecap", "round");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M2 4.16668H14M10.7038 4.16668L10.2487 3.22783C9.9464 2.60418 9.7952 2.29236 9.53447 2.09788C9.47667 2.05474 9.4154 2.01637 9.35133 1.98314C9.0626 1.83334 8.71607 1.83334 8.023 1.83334C7.31253 1.83334 6.95733 1.83334 6.66379 1.98942C6.59873 2.02402 6.53665 2.06394 6.47819 2.10879C6.21443 2.31114 6.06709 2.63438 5.77241 3.28085L5.36861 4.16668");
    path2.setAttribute("stroke", "#6B6671");
    path2.setAttribute("stroke-linecap", "round");

    const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path3.setAttribute("d", "M6.33337 11.5V7.5");
    path3.setAttribute("stroke", "#6B6671");
    path3.setAttribute("stroke-linecap", "round");

    const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path4.setAttribute("d", "M9.66663 11.5V7.5");
    path4.setAttribute("stroke", "#6B6671");
    path4.setAttribute("stroke-linecap", "round");

    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);
    svg.appendChild(path4);

    li.appendChild(div);
    li.appendChild(svg);

    ul.appendChild(li);


    svg.addEventListener("click", () => {
        removeList(name); // Chama a função removeList passando o nome do item
        saveListToLocalStorage();
        error.classList.remove("delete")
        error.classList.add("show-alert")
    });
}


function removeList(name){
    
    const itemToRemove = ul.querySelector(`li.${name}`); // Procura pelo <li> com a classe igual ao nome
    
    if (itemToRemove) {
        ul.removeChild(itemToRemove); // Remove o item da lista
    }

}


function saveListToLocalStorage() {
    const items = [];
    const listItems = ul.querySelectorAll("li");

    listItems.forEach(item => {
        const name = item.querySelector("h2").textContent.trim();
        items.push(name);
    });

    localStorage.setItem("listItems", JSON.stringify(items)); // Salvar lista no localStorage
}

// Função para carregar os itens do localStorage
function loadListFromLocalStorage() {
    const savedItems = JSON.parse(localStorage.getItem("listItems"));

    if (savedItems && savedItems.length > 0) {
        savedItems.forEach(item => {
            createListItem(item);
        });
    }
}
