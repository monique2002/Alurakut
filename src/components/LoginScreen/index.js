import React, { useState } from 'react';
import {useRouter} from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = useState('');

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <div className="imageLogin">
            <img src="https://dgrau.digital/wp-content/uploads/2021/05/novos-caminhos-comunicacao-dgrau-digital-2-1.png" />
          </div>
          <div className="descriptionHome">
            <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
            <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
            <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
          </div>   
        </section>

        <section className="formArea">
            <form className="box" onSubmit={(event) => {
              event.preventDefault();
                    
              fetch('https://alurakut.vercel.app/api/login',{
                method: 'Post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({githubUser: githubUser})
              })
              .then(async(response) => {
                const answerInformation = await response.json();
                const token = answerInformation.token;
                nookies.set(null, 'USER_TOKEN', token, {
                  path: '/',
                  maxAge: 86400 * 7
                });
                router.push('/');
              })
            }}>
                <div className="logoHome">
                  <img src="https://alurakut.vercel.app/logo.svg" />
                </div>
                <p>
                  Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                </p>
                <input 
                    placeholder="Usuário" 
                    value={githubUser} 
                    onChange={(e) => {
                        setGithubUser(e.target.value);
                    }} 
                />
                
                <button disabled={githubUser.length === 0 } type="submit">
                    Login
                </button>
            </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="https://github.com/signup?source=login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 