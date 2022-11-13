import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { useApp } from "./useApp";
function App() {
  const { logout, router, user } = useApp()

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto gap-3">
          <li className="btn-group">
            <button onClick={() => router.navigate("/restaurants")} className="btn btn-secondary">
              Restaurants
            </button>
          </li>
          <li className="btn-group">
            {user
              ? <button
                onClick={logout}
                className="btn btn-secondary"
                style={{ cursor: 'pointer' }}
              >
                Logout {user.name}
              </button>
              : <button onClick={() => router.navigate("/login")} className="btn btn-secondary">
                Login
              </button>
            }
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
