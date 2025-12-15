import { userService } from "../services/userService.js";
import { db } from "../db/db.js";
import sinon from "sinon";

describe('User Service', () => {
    let getByIdStub, addToCollectionStub, updateByIdStub, deleteFromCollectionByIdStub;

    beforeAll(() => {
        getByIdStub = sinon.stub(db, 'getById');
        addToCollectionStub = sinon.stub(db, 'addToCollection');
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

    it('should get a user by ID', async () => {
        const fakeUserDoc = {
            _id: '507f1f77bcf86cd799439011',
            firstName: 'firstName',
            lastName: 'lastName',
            username: 'testuser',
            password: 'hashedpassword',
        };

        getByIdStub.resolves(fakeUserDoc);

        const user = await userService.getById('507f1f77bcf86cd799439011');

        expect(getByIdStub.calledOnce).toBe(true);
        expect(getByIdStub.calledWith(db.USERS, '507f1f77bcf86cd799439011')).toBe(true);
        expect(user.username).toBe('testuser');
        expect(user.firstName).toBe('firstName');
        expect(user.lastName).toBe('lastName');
    });

    it('should create a new user', async () => {
        const userInfo = {
            username: 'newuser',
            firstName: 'newName',
            lastName: 'newLast',
            password: 'pass123',
            role: 'customer',
        };

        addToCollectionStub.resolves({ insertedId: '507f1f77bcf86cd799439011' });

        const newUser = await userService.add(userInfo);

        expect(addToCollectionStub.calledOnce).toBe(true);
        expect(addToCollectionStub.calledWith(db.USERS, sinon.match.object)).toBe(true);
        expect(newUser.username).toBe('newuser');
        expect(newUser.id).toBe('507f1f77bcf86cd799439011');
    });

    it('should update a user', async () => {
        updateByIdStub.resolves({ modifiedCount: 1 });
        const updatedFields = { firstName: 'New Name' };

        const updatedUser = await userService.update('507f1f77bcf86cd799439011', updatedFields);

        expect(updateByIdStub.calledOnce).toBe(true);
        expect(updateByIdStub.calledWith(db.USERS, '507f1f77bcf86cd799439011')).toBe(true);
        expect(updatedUser.firstName).toBe('New Name');
    });

    it('should delete a user', async () => {
        deleteFromCollectionByIdStub.resolves({ deletedCount: 1 });

        const deleted = await userService.deleteIt('507f1f77bcf86cd799439011');

        expect(deleteFromCollectionByIdStub.calledOnce).toBe(true);
        expect(deleteFromCollectionByIdStub.calledWith(db.USERS, '507f1f77bcf86cd799439011')).toBe(true);
        expect(deleted.deletedCount).toBe(1);
    })
})