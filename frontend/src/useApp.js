import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AddReview } from "./components/AddReview";
import { Login } from "./components/Login";
import { Restaurant } from "./components/Restaurant";
import { RestaurantList } from "./components/RestaurantList";


export function useApp() {
    const [user, setUser] = useState(null);
    const login = async (user = null) => setUser(user)
    const logout = async () => setUser(null)

    const router = createBrowserRouter([
        {
            exact: true,
            path: "/",
            element: <RestaurantList />
        }, {
            exact: true,
            path: "/restaurants",
            element: <RestaurantList />
        }, {
            path: "/restaurants/:id/review",
            element: <AddReview user={user} />
        }, {
            path: "/restaurants/:id",
            element: <Restaurant user={user} />
        }, {
            path: "/login",
            element: <Login login={login} />
        }
    ])

    return {
        user, setUser, logout, login, router
    }
}
