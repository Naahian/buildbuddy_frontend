import { API } from "../api/api";

export class AdminController {
    constructor(componentInstance) {
        this.component = componentInstance;
    }

    dashboardInitState() {
        this.getUsers();
        this.getComponents();
        this.getProjects();
        this.getOrders();
    }

    usersInitState() {
        this.getUsers();
    }

    projectsInitState() {
        this.getProjects();
    }

    componentsInitState() {
        this.getComponents();
    }

    ordersInitState() {
        this.getOrders();
    }



    async getUsers() {
        const users = await API.getUsers();
        console.log(users)
        this.component.setState({ users });
    }

    async getComponents(id = null) {
        const components = await API.getComponents(id);
        this.component.setState({ components });
    }

    async getProjects(id = null) {
        const projects = await API.getProjects(id);
        this.component.setState({ projects });
    }

    async getOrders() {
        const orders = await API.getOrders();
        this.component.setState({ orders });
    }

    async createUser(data) {
        const response = await API.createUser(data);
        this.showAlert(response)
        await this.getUsers();
    }
    async deleteUser(id) {
        const response = await API.deleteUser(id);
        this.showAlert(response)
        await this.getUsers();
    }

    async createComponent(id) {
        const response = await API.createComponent(id);
        this.showAlert(response)
        await this.getComponents();
    }
    async deleteComponent(id) {
        const response = await API.deleteComponent(id);
        this.showAlert(response)
        await this.getComponents();
    }

    async createProject(data) {
        const response = await API.createProject(data);
        this.showAlert(response)
        this.showAlert(response)
        await this.getProjects();
    }
    async deleteProject(id) {
        const response = await API.deleteProject(id);
        this.showAlert(response)
        this.showAlert(response)
        await this.getProjects();
    }

    async createOrder(data) {
        const response = await API.createOrder(data);
        this.showAlert(response)
        await this.getOrders();
    }

    async deleteOrder(id) {
        const response = await API.deleteOrder(id);
        this.showAlert(response)
        await this.getOrders();
    }

    showAlert(response) {
        if ((typeof response.message).includes("object")) {
            alert(JSON.stringify(response.message));
        } else {
            alert(response.message);
        }

    }
}

export default AdminController;