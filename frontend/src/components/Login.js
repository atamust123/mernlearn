import React, { useState } from "react";
import { useNavigate } from "react-router";
const initialUser = {
    name: "", id: ""
}
export const Login = (props) => {
    const { login } = props || {}
    const [user, setUser] = useState(initialUser)
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target || {};
        setUser({ ...user, [name]: value })
    }
    const onClickLogin = () => {
        login(user);
        navigate("/")
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        value={user.id}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={onClickLogin} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    );
}