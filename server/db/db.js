import { MongoClient, ObjectId } from "mongodb";

const mongoURI = 'mongodb://127.0.0.1:27017';
const dbName = 'myhealthydelights';
const USERS = 'users';
const PRODUCTS = 'products';
const CUSTOM_CAKES = 'custom_cakes'

let mongoClient = null;
let theDb = null;

const init = async () => {
    console.log("DB INIT STARTING...");
    mongoClient = new MongoClient(mongoURI);
    await mongoClient.connect();
    theDb = mongoClient.db(dbName);
    console.log("DB INIT COMPLETE");
    console.log("theDb after init:", theDb);
}


const getAllInCollection = async (collectionName) => {
    if (!mongoClient) { await init(); }
    const allDocs = await theDb.collection(collectionName).find();
    return allDocs.toArray();
}

const getById = async (collectionName, id) => {
    if (!mongoClient) await init();
    const filter = { _id: new ObjectId(String(id)) };
    const result = await theDb.collection(collectionName).findOne(filter);
    return result;
}

const addToCollection = async (collectionName, docData) => {
    if (!mongoClient) { await init(); }
    const result = await theDb.collection(collectionName).insertOne(docData);
    return { insertedId: result.insertedId };
}

const updateById = async (collectionName, id, updateData) => {
    if (!mongoClient) await init();

    if ('_id' in updateData) {
        delete updateData._id;
    }
    const filter = { _id: new ObjectId(String(id)) };

    const result = await theDb.collection(collectionName).updateOne(filter, { $set: updateData });
    return result;
};


const deleteFromCollectionById = async (collectionName, id) => {
    if (!mongoClient) await init();
    const filter = { _id: new ObjectId(String(id)) };
    const result = await theDb.collection(collectionName).deleteOne(filter);
    return result;
};

const deleteFromCollectionByCategory = async (collectionName, category) => {
    if (!mongoClient) await init(); 
    const filter = category; 
    const result = await theDb.collection(collectionName).deleteMany(category); 
    return result;
}

const getFromCollectionByFieldValue = async (collectionName, field, value) => {
    if (!mongoClient) await init();
    const docs = await theDb.collection(collectionName).find({ [field]: value }).toArray();
    return docs;
};


export const db = {
    init,
    getAllInCollection,
    getById,
    addToCollection,
    deleteFromCollectionById,
    deleteFromCollectionByCategory,
    updateById,
    getFromCollectionByFieldValue,
    PRODUCTS,
    USERS,
    CUSTOM_CAKES,
}