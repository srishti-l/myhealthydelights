class Product {
    id = '';
    name = '';
    category = '';
    price = '';
    description = '';
    healthConcerns = [];

    constructor(productFields) {
        const id = productFields.id ?? String(Date.now());
        this.updateProperties({ id, ...productFields })
    }

    updateProperties = (productFields) => {
        this.id = productFields.id ?? this.id;
        this.name = productFields.name ?? this.name;
        this.category = productFields.category ?? this.category;
        this.price = productFields.price ?? this.price;
        this.description = productFields.description ?? this.description;
        this.healthConcerns = productFields.healthConcerns ?? this.healthConcerns;
    }

    static fromProductDocument = (productDocument) => {
        const id = productDocument._id?.toString(); 
        if (!id) {
            throw new Error('Could not find _id in Product Document'); 
        }
        delete productDocument._id; 
        const product = new Product({id, ...productDocument}); 
        return product; 
    }

}

export { Product }; 



