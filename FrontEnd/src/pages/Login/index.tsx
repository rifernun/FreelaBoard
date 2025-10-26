import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/signup", {
        email: String(email),
        password: String(password),
        username: String(username),
      });

      setLogin(true);
    } catch (err) {
      console.log("an error ocurred: ", err);
    }
  };

  const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signin", {
        email: String(email),
        password: String(password),
      });
      localStorage.setItem("id", res.data.user);
      setLogged(true);
      setInterval(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.log("an error ocurred: ", err);
    }
  };

  return (
    <div
      className={`${styles.pageWrapper} ${
        login ? styles.loginMode : styles.registerMode
      } ${logged ? styles.logged : ""} `}
    >
      <div className={styles.signupContainer}>
        {/* Painel de boas-vindas */}
        <div className={styles.welcomePanel}>
          <h2>{login ? "BEM VINDO DE VOLTA!" : "BEM VINDO!"}</h2>
          <p>
            Preencha os campos para concluir o {login ? "Login" : "Cadastro"}!
          </p>
        </div>

        {/* Painel do formulário */}
        <div className={styles.formPanel}>
          <h3>Sign {login ? "In" : "Up"}</h3>
          <form onSubmit={login ? LoginUser : registerUser}>
            {!login && (
              <div className={styles.inputGroup}>
                <label htmlFor="username">Nome de Usuário</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
            </div>
            <button type="submit" className={styles.btnSignup}>
              Sign {login ? "In" : "Up"}
            </button>
          </form>
          <p className={styles.loginLink}>
            {login ? "Não tem cadastro? " : "Já tem uma conta? "}
            <a href="#" onClick={() => setLogin(!login)}>
              {login ? "Cadastre-se" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
