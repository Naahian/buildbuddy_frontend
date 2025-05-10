export class Project {
    constructor(id, title, description, tags, component_ids) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tags = tags; // string or array, based on your backend
        this.component_ids = component_ids; // array of IDs
    }

    static fromJSON(json) {
        return new Project(
            json.id,
            json.title,
            json.description,
            json.tags,
            json.component_ids
        );
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            tags: this.tags,
            component_ids: this.component_ids
        };
    }
}
