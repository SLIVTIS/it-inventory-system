import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API_DOMAIN from "../../config";

function Login() {
  const navigate = useNavigate();

  const { data, error, isLoading, fetchData } = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem('user', JSON.stringify(data));
      navigate("/dashboard");
    }
  }, [data]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password
    };

    fetchData(`${API_DOMAIN}/api/v1/login`, 'POST', body);
  };

  return (
    <div className="form-body">
      <div className="login-container">
        <div className="img-holder">
          <div className="bg"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-login">
              <h2>Iniciar sesión</h2>
              <p>Acceso a la herramienta de sistema de inventario para TI.</p>
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="username"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-button">
                  {!isLoading && <button>Acceder</button>}
                  {isLoading && <button>Accediendo...</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
