import { validateLogin } from "../services/authService.js";
import { authorize } from "../middleware/authMiddleware.js";
import { db } from "../db/db.js";
import bcrypt from "bcryptjs";
import sinon from "sinon";

describe("Auth Service", () => {
    let getFromCollectionStub;
    let bcryptCompareStub;

    beforeAll(() => {
        getFromCollectionStub = sinon.stub(db, "getFromCollectionByFieldValue");
        bcryptCompareStub = sinon.stub(bcrypt, "compare");
    })

    afterAll(() => {
        getFromCollectionStub.restore();
        bcryptCompareStub.restore();
    })

    afterEach(() => sinon.resetHistory());

    it("should validate login and return a user with JWT", async () => {
        const fakeUserDoc = {
            _id: '507f1f77bcf86cd799439011',
            firstName: 'firstName',
            lastName: 'lastName',
            username: 'testuser',
            password: 'hashedpassword',
            role: 'admin',
        };

        getFromCollectionStub.resolves([fakeUserDoc]);
        bcryptCompareStub.resolves(true);

        const user = await validateLogin('testuser', 'password123');

        expect(getFromCollectionStub.calledOnceWith(db.USERS, 'username'));
        expect(bcryptCompareStub.calledOnceWith('password123', 'hashedpassword'));
        expect(user).toHaveProperty('jwt');
        expect(user.username).toBe('testuser');
        expect(user.firstName).toBe('firstName');
        expect(user.lastName).toBe('lastName');
        expect(user.username).toBe('testuser');
        expect(user.role).toBe('admin');
        expect(user).not.toHaveProperty('password');
    });

    it('should throw an error if username not found', async () => {
        getFromCollectionStub.resolves(null);
        await expect(validateLogin('nouser', 'pass')).rejects.toThrow('username not found');
    })

    it('should throw an error if role is not admin', async () => {
        const req = { user: { role: 'customer' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
        const next = sinon.stub();

        authorize('admin')(req, res, next);

        expect(res.status.calledOnceWith(403)).toBe(true);
        expect(res.json.calledOnceWith({ error: 'Access denied' })).toBe(true);
        expect(next.notCalled).toBe(true);
    })

    it('should throw error if password is incorrect', async () => {
        const fakeUserDoc = {
            _id: '507f1f77bcf86cd799439011',
            firstName: 'firstName',
            lastName: 'lastName',
            username: 'testuser',
            password: 'hashedpassword',
            role: 'admin',
        };
        getFromCollectionStub.resolves([fakeUserDoc]);
        bcryptCompareStub.resolves(false);

        await expect(validateLogin("testuser", "wrongpass")).rejects.toThrow("invalid password");
    });

})