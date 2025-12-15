import { db } from "../db/db.js";
import { Product } from "../models/products.js";

const getAll = async () => {
    const allProducts = await db.getAllInCollection(db.PRODUCTS);
    return allProducts.map(p => Product.fromProductDocument(p))
}

const getByCategory = async (category) => {
    const productCategory = await db.getFromCollectionByFieldValue(db.PRODUCTS, "category", category);
    return productCategory.map(p => Product.fromProductDocument(p))
}

const getById = async (id) => {
    const productDoc = await db.getById(db.PRODUCTS, id);
    return Product.fromProductDocument(productDoc)
}

const addProduct = async (productInfo) => {
    const { insertedId } = await db.addToCollection(db.PRODUCTS, productInfo); 
    return {
        id_: insertedId.toString(), 
        ...productInfo
    }
}

const update = async (id, productInfo) => {
    await db.updateById(db.PRODUCTS, id, productInfo);
    return {
        id: id.toString(),
        ...productInfo
    }
}

const deleteIt = async (id) => {
    const { deletedCount } = await db.deleteFromCollectionById(db.PRODUCTS, id);
    return { deletedCount }; 
}

const deleteCategory = async (category) => {
    const { deletedCount } = await db.deleteFromCollectionByCategory(db.PRODUCTS, category); 
    return { deletedCount }; 
}

export const productService = {
    getAll, 
    getById, 
    getByCategory, 
    addProduct, 
    update, 
    deleteIt, 
    deleteCategory, 
}

