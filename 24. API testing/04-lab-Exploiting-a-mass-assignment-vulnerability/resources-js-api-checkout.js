var cachedOrder = null;

const element = (selector) => {
    const e = document.querySelector(selector);

    if (e == null) {
        throw new Error("Failed to find item with selector: " + selector);
    }

    return e;
}

const centsToPriceString = (cents) => {
    return "$" + Math.floor(cents / 100) + "." + padCents(cents % 100);
}

const htmlProductList = (products) => {
    let html = "";

    products.forEach(product => {
        const rowHtml = buildProductRow(product.product_id, product.name, centsToPriceString(product.item_price), product.quantity);
        html += rowHtml;
    });

    return html;
}

const calculateTotalFromProducts = (products) => {
    return products.reduce((total, product) => total + product.item_price, 0);
}

const padCents = (cents) => {
    const s = String(cents);
    if (s.length < 2) {
        return "0" + s;
    } else {
        return s;
    }
}

const loadOrder = (order) => {
    element("#cart-items > tbody").innerHTML = htmlProductList(order.chosen_products);
    element("#cart-total").innerHTML = centsToPriceString(calculateTotalFromProducts(order.chosen_products));
};

const getProductIdsAndQuantitiesFromOrder = (order) => {
    return { chosen_products: order.chosen_products.map(product => ({ product_id: product.product_id, quantity: product.quantity })) };
}

const doLoadCart = () => {
    fetch(
        getApiEndpoint(),
        {
            method: 'GET'
        }
    )
        .then(res => res.json())
        .then(order => { cachedOrder = getProductIdsAndQuantitiesFromOrder(order); loadOrder(order); });
}

const doCheckout = (event) => {
    event.preventDefault();

    if (cachedOrder == null) {
        throw new Error("No cached order found!");
    }

    fetch(
        getApiEndpoint(),
        {
            method: 'POST',
            body: JSON.stringify(cachedOrder)
        }
    )
        .then(res => res.headers.get("Location"))
        .then(loc => window.location = loc);
};

window.onload = () => {
    doLoadCart();
}
