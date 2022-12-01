const hostName = "http://localhost:8080";
export const ApiUrls = {
    products: {
        allProducts: "/api/products",
        getProduct: "/api/products/",
        addProduct: "/api/products",
        deleteProduct: "/api/products/delete/",
        findProducts: "/api/products/find?"
    },
    users: {
        getUsers: "/api/users",
        getUser: "/api/users/user/",
        addUser: "/api/users/signup",
        addRoleToUser: "/api/users/addRoleToUser"
    }
}