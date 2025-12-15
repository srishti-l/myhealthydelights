import { productService } from "../services/productService.js";
import { db } from "../db/db.js";
import sinon from "sinon";

describe('Product Service', () => {
    let getByIdStub, getFromCollectionStub, addToCollectionStub, updateByIdStub, deleteFromCollectionByIdStub;

    beforeAll(() => {
        getByIdStub = sinon.stub(db, 'getById');
        addToCollectionStub = sinon.stub(db, 'addToCollection');
        getFromCollectionStub = sinon.stub(db, 'getFromCollectionByFieldValue');
        updateByIdStub = sinon.stub(db, 'updateById');
        deleteFromCollectionByIdStub = sinon.stub(db, 'deleteFromCollectionById');
    })

    afterAll(() => {
        getByIdStub.restore();
        addToCollectionStub.restore();
        updateByIdStub.restore();
        deleteFromCollectionByIdStub.restore();
    })

    afterEach(() => sinon.resetHistory());

    it('should get a product by ID', async () => {
        const fakeProductDoc = {
            _id: '507f1f77bcf86cd799439011',
            name: 'Cranberry Bread',
            price: 30,
            category: 'bread',
            description: 'Yummy cranberry bread loaf',
            healthConcerns: ['Gluten Free'],
        };

        getByIdStub.resolves(fakeProductDoc);

        const product = await productService.getById('507f1f77bcf86cd799439011');

        expect(getByIdStub.calledOnce).toBe(true);
        expect(getByIdStub.calledWith(db.PRODUCTS, '507f1f77bcf86cd799439011')).toBe(true);
        expect(product.name).toBe('Cranberry Bread');
        expect(product.price).toBe(30);
        expect(product.category).toBe('bread');
        expect(product.description).toBe('Yummy cranberry bread loaf');
        expect(product.healthConcerns).toStrictEqual(['Gluten Free'])
    });

    it('should get a product by category', async () => {
        const fakeProductDoc = {
            _id: '507f1f77bcf86cd799439011',
            name: 'Cranberry Bread',
            price: 30,
            category: 'bread',
            description: 'Yummy cranberry bread loaf',
            healthConcerns: ['Gluten Free'],

        };

        getFromCollectionStub.resolves([fakeProductDoc]);
        const product = await productService.getByCategory('bread');

        expect(getFromCollectionStub.calledOnce).toBe(true);
        expect(getFromCollectionStub.calledWith(db.PRODUCTS, 'category', 'bread')).toBe(true);
        expect(product[0].name).toBe('Cranberry Bread');
        expect(product[0].price).toBe(30);
        expect(product[0].category).toBe('bread');
        expect(product[0].description).toBe('Yummy cranberry bread loaf');
        expect(product[0].healthConcerns).toStrictEqual(['Gluten Free'])
    })

    it('should create a new product', async () => {
        const productInfo = {
            name: 'Cranberry Bread',
            price: 30,
            category: 'bread',
            description: 'Yummy cranberry bread loaf',
            healthConcerns: ['Gluten Free'],
        };

        addToCollectionStub.resolves({ insertedId: '507f1f77bcf86cd799439011' });

        const newProduct = await productService.addProduct(productInfo);

        expect(addToCollectionStub.calledOnce).toBe(true);
        expect(addToCollectionStub.calledWith(db.PRODUCTS, sinon.match.object)).toBe(true);
        expect(newProduct.name).toBe('Cranberry Bread');
        expect(newProduct.category).toBe('bread');
        expect(newProduct.price).toBe(30);
        expect(newProduct.description).toBe('Yummy cranberry bread loaf');
        expect(newProduct.healthConcerns).toStrictEqual(['Gluten Free']);
    });

    it('should update a product by Id', async () => {
        updateByIdStub.resolves({ modifiedCount: 1 });
        const updatedFields = { 'name': 'Cranberry Walnut Bread' };

        const updatedProduct = await productService.update('507f1f77bcf86cd799439011', updatedFields);

        expect(updateByIdStub.calledOnce).toBe(true);
        expect(updateByIdStub.calledWith(db.PRODUCTS, '507f1f77bcf86cd799439011')).toBe(true);
        expect(updatedProduct.name).toBe('Cranberry Walnut Bread');
    });

    it('should delete a product', async () => {
        deleteFromCollectionByIdStub.resolves({ deletedCount: 1 });

        const deleted = await productService.deleteIt('507f1f77bcf86cd799439011');

        expect(deleteFromCollectionByIdStub.calledOnce).toBe(true);
        expect(deleteFromCollectionByIdStub.calledWith(db.PRODUCTS, '507f1f77bcf86cd799439011')).toBe(true);
        expect(deleted.deletedCount).toBe(1);
    })
})