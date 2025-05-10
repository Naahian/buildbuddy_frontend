export class Component {
    constructor(id, name, price, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    static fromJSON(json) {
        return new Component(json.id, json.name, json.price, json.description);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description
        };
    }
}

// // Deserialize
// const component = Component.fromJSON(apiResponseComponent);

// // Serialize
// const jsonPayload = component.toJSON();