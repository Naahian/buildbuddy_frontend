export class Order {
    constructor(id, user_id, total_price, created_at) {
        this.id = id;
        this.user_id = user_id;
        this.total_price = total_price;
        this.created_at = created_at;
    }

    static fromJSON(json) {
        return new Order(
            json.id,
            json.user_id,
            json.total_price,
            json.created_at
        );
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            total_price: this.total_price,
            created_at: this.created_at
        };
    }
}
