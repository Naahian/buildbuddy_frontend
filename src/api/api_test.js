import { API } from "./api.js";

async function testWelcome() {
    const res = await API.welcome();
    const data = await res.text();
    console.log("Welcome:", res.status, data);
}

async function testLogin() {
    const credentials = {
        email: "nahiandev@gmail.com",
        password: "Tree1234%"
    };

    const res = await API.login(credentials);
    const data = await res.json();
    console.log("Login:", res.status, data);

    if (!res.ok) {
        console.error("Login failed");
    }
}

async function testLogout() {
    const res = await API.logout();
    const data = await res.json();
    console.log("Logout:", res.status, data);
}

async function testCreateUser() {
    const newUser = {
        name: "New Test User",
        email: "newuser@example.com",
        password: "newpassword",
    };

    const res = await API.createUser(newUser);
    const data = await res.json();
    console.log("Create User:", res.status, data);
}

async function testGetProjects() {
    const res = await API.getProjects();
    const data = await res.json();
    console.log("Get Projects:", res.status, data);
}


(async () => {
    await testWelcome();
    await testLogin();
    await testLogout();
    // await testCreateUser();
    // await testGetProjects();

})();
