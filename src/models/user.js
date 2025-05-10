export class User {
    constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    static fromJSON(json) {
        return new User(json.id, json.name, json.email, json.role);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
        };
    }
}
