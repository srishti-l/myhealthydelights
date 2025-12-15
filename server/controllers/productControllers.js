import { productService } from "../services/productService.js";

const getProducts = async (req, res) => {
    const allProducts = await productService.getAll(); 
    res.json(allProducts);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const theProduct = await productService.getById(id);
    res.json(theProduct);
};

const getProductByCategory = async (req, res) => {
    const { category } = req.params; 
    const productsInCategory = await productService.getByCategory(category); 
    res.json(productsInCategory); 
};

const addProduct = async (req, res) => {
    const productData = req.body; 
    const newProduct = await productService.addProduct(productData); 
    res.json(newProduct);
};

const updateProduct = async (req, res) => {
    const { id } = req.params; 
    const productInfo = req.body; 
    const updatedProduct = await productService.update(id, productInfo); 
    res.json(updatedProduct); 
};

const deleteProduct = async (req, res) => {
    const { id } = req.params; 
    const { deletedCount } = await productService.deleteIt(id); 
    res.json({ deletedCount }); 
};

export const productControllers = {
    getProducts, 
    getProductById, 
    getProductByCategory, 
    addProduct, 
    updateProduct, 
    deleteProduct
};

