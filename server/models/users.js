import { ObjectId } from "mongodb";

class User {
    id = '';
    firstName = '';
    lastName = '';
    username = '';
    password = '';
    role = 'customer';

    constructor(userFields) {
        this.id = userFields.id ? new ObjectId(userFields.id) : null;
        this.updateProperties(userFields)
    }

    updateProperties = (userFields) => {
        this.id = userFields.id ?? this.id;
        this.firstName = userFields.firstName ?? this.firstName;
        this.lastName = userFields.lastName ?? this.lastName;
        this.username = userFields.username ?? this.username;
        this.password = userFields.password ?? this.password;
        this.role = userFields.role ?? this.role; 
    }

    static fromUserDocument = (userDocument) => {
        const id = userDocument._id?.toString();
        if (!id) {
            throw new Error('Could not find _id in User Document');
        }
        const plain = { ...userDocument };
        delete plain._id;

        const user = new User({ id, ...plain });
        return user;
    }
}

export { User };