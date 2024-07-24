const getProducts = async () => {
    try {
        let response = await fetch("/products.json");
        let data = await response.json();
        return data.products;

    } catch (error) {
        throw new Error("No se pudo obtener la data de los productos.");
    }
};

const getProduct = async (id) => {
    try {
        let response = await fetch("/products.json");
        let data = await response.json();
        let products = data.products;
        
        let productFound = products.find(product => product.id == id);
        return productFound;

    } catch (error) {
        throw new Error("No se pudo obtener la data del producto.");
    }
}

export default {
    getProducts,
    getProduct
}