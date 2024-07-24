const getUser = async (email, password) => {
    try {
        
        let response = await fetch("/users.json");
        let data = await response.json();

        let users = data.users;

        let foundUser = users.find(user => user.email ==email && user.password == password);
        delete foundUser.password;

        return foundUser;

    } catch (error) {
        throw new Error("No se pudo obtener la data del usuario.");
    }

};

const getUsers = async () => {
    try {
        let response = await fetch("/users.json");
        let data = await response.json();

        let users = data.users;
        return users;

    } catch (error) {
        throw new Error("No se pudo obtener la data de los usuarios");
    }
}

export default {
    getUser,
    getUsers
}