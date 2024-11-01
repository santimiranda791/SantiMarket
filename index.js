let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.count-product');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

loadEventListeners();

function loadEventListeners() {
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id === deleteId) {
                let priceReduce = parseFloat(value.price) * value.amount;
                totalCard = totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        countProduct--;
        
        if (buyThings.length === 0) {
            priceTotal.innerHTML = 0;
            amountProduct.innerHTML = 0;
        }
        loadHtml();
    }
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('img').src,
        title: product.querySelector('h2').textContent,
        // Aqui se ajusta el selector y la conversión de precio según tu HTML
        price: parseFloat(product.querySelector('h3').textContent.replace('Precio: ', '').replace('.', '').trim()), // Asegúrate de que esto sea correcto
        id: product.querySelector('button').getAttribute('data-id'),
        amount: 1
    };

    // Verifica que infoProduct.price sea un número
    if (isNaN(infoProduct.price)) {
        console.error("El precio no es un número:", infoProduct.price);
        return; // Salimos si el precio no es válido
    }

    // Asegúrate de que totalCard sea un número antes de sumar
    totalCard = parseFloat(totalCard) || 0; // Convierte totalCard a número, o usa 0 si es NaN

    totalCard += infoProduct.price; // Suma el precio del producto
    totalCard = totalCard.toFixed(2); // Aplica toFixed después de la suma

    // Comprobamos si el producto ya existe en el carrito
    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        // Si ya existe, aumentamos la cantidad
        buyThings = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product;
            }
        });
    } else {
        // Si no existe, lo agregamos al carrito
        buyThings.push(infoProduct);
        countProduct++;
    }

    loadHtml(); // Actualizamos el HTML del carrito
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}

function clearHtml() {
    containerBuyCart.innerHTML = '';
}