import styles from "./styles.module.css";

export function LoginPage() {
  return (
    // Este wrapper controla a página inteira
    <div className={styles.pageWrapper}>
      {/* Este é o contêiner do formulário da imagem */}
      <div className={styles.signupContainer}>
        <div className={styles.welcomePanel}>
          <h2>BEM VINDO DE VOLTA!</h2>
          <p>Preencha os campos para concluir o login!</p>
        </div>

        <div className={styles.formPanel}>
          <h3>Sign Up</h3>
          <form action="#">
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email ou Usuário</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" name="password" />
            </div>
            <button type="submit" className={styles.btnSignup}>
              Sign Up
            </button>
          </form>
          <p className={styles.loginLink}>
            Já tem uma conta? <a href="#">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
