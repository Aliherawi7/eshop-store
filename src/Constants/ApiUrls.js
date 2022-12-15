
const ApiUrls = {
    hostName : "http://localhost:8080",
    products: {
        allProducts: "/api/products",
        getProduct: "/api/products/",
        addProduct: "/api/products",
        deleteProduct: "/api/products/delete/",
        findProducts: "/api/products/find?"
    },
    users: {
        getUsers: "/api/users",
        putUser: "/api/users",
        getUser: "/api/users/user",
        addUser: "/api/users/signup",
        addRoleToUser: "/api/users/addRoleToUser"
    },
    favorites:{
        allFavorites:"/api/favorites",
        addFavorite:"/api/favorites"

    },
    comments:{
        productComments:'/api/comments/products/',  
    }
}
export default ApiUrls