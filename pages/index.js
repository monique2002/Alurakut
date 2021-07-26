import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { useEffect, useState } from 'react';

function ProfileSideBar(propriedades) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} 
        style={{borderRadius: '8px'}} />
      <hr />
      <a className="boxLink" 
        href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return(
    <ProfileRelationsBoxWrapper> 
      <h2 className="smallTitle">
        {propriedades.title} <span style={{color: '#C71585'}}>({propriedades.items.length})</span>
      </h2>
      <ul>
        {propriedades.items.slice(0,6).map((seguidor) => {
          return(
            <li key={seguidor.id}>
              <a href={`https://github.com/${seguidor}.png`}>
                <img src={seguidor.avatar_url} />
                  <span>{seguidor.login}</span>
              </a>
            </li>
            )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const [seguidores, setSeguidores] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [recados, setRecados] = useState([]);
  const [peoplesFavorites, setPeoplesFavorites] = useState([]);
  const user = props.githubUser;

  useEffect(() => {
    fetch(`https://api.github.com/users/${user}/following`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setPeoplesFavorites(response);
    });

    fetch(`https://api.github.com/users/${user}/followers`)
    .then(function(response) {
      if(response.ok) {
        return response.json() 
      }
      throw new Error('Error ' + response.status)
    }, [])
    .then(function(response) {
      setSeguidores(response);
    })
    .catch(function(error) {
      console.log(error);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '9798dd6f579ce79b0dc7ee99677e1a',
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      },
      body: JSON.stringify({"query": `query {
        allCommunities {
          id
          title
          imageUrl
          communityUrl
        }
      }
      `})
    })
    .then((response) => response.json())
    .then((response) => {
      const comunidadesDato = response.data.allCommunities;
      setComunidades(comunidadesDato);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '9798dd6f579ce79b0dc7ee99677e1a',
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      },
      body: JSON.stringify({"query": `query{
        allComments {
          autor,
          descricao
        }
      }`})
    })
    .then((response) => response.json())
    .then((response) => {
      const commentsDato = response.data.allComments;
      setRecados(commentsDato);
    });
  }, []);
  
  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <Box>
            <ProfileSideBar githubUser={user}></ProfileSideBar>
          </Box>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box> 
            <h1 className="title">
              Bem vindo(a), {user}
            </h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle"> 
              O que você deseja fazer? 
            </h2>
            <form onSubmit={function handleCreateComunidade(event) {
              event.preventDefault();
              const dadosForm = new FormData(event.target);

              const comunidade = {
                title: dadosForm.get('title'),
                community_url: dadosForm.get('urlCommunity'),
                image_url: dadosForm.get('urlImage') ?
                        dadosForm.get('urlImage') 
                        : `https://picsum.photos/200/300?${Math.random()}`,
                creator_slug: "monique2002"
              };

              fetch('/api/community', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async(response) => {
                const dados = await response.json();
                const comunidade = dados.registroCriado;
                const comunidadeAtualizada = [...comunidades, comunidade];
                setComunidades(comunidadeAtualizada);
              })
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  type="texte"
                  aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
                <input 
                  placeholder="Coloque a URL da comunidade" 
                  name="urlCommunity" 
                  aria-label="Coloque a URL da comunidade" />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa (Opcional)" 
                  name="urlImage" 
                  aria-label="Coloque uma URL para usarmos de capa (Opcional)" />
              </div>
              <button>
                Criar comunidade
              </button>
          </form>
          </Box>
          <Box> 
            <h2 className="subTitle"> 
              Deixe o seu recado
            </h2>
            <div>
              <form onSubmit={function handleCreateComments(event) {
                event.preventDefault();
                const dados = new FormData(event.target);
                    
                fetch('api/comment', {
                  method: 'POST',
                  headers: {'Content-Type' : 'application/json'},
                  body: JSON.stringify({
                    autor: user,
                    descricao: dados.get('descricao')
                  })
                })
                .then(async(response) => {
                  const dados = await response.json();
                  const  recado = dados.registroCriado;
                  const recadosObj = [...recados, recado];
                    setRecados(recadosObj);
                });
              }}>
              <input 
                placeholder="O que deseja escrever?" 
                name="descricao" 
                aria-label="O que deseja escrever?" />
                <button>
                  Enviar
                </button>
              </form>
            </div>  
          </Box>
            <Box>
              <h2 className="subTitle"> 
                Alguns recados..
              </h2>
              <ul>
                {recados.slice(0,3).map((recado) => {
                  return(
                    <>
                      <div className="authorCard">
                        <img style={{width: '60px', borderRadius: '50px'}} src={`https://github.com/${recado.autor}.png`} />
                        <h2 className="authorName">User: {recado.autor}</h2>
                      </div>
                      <h6 className="comment">{recado.descricao}</h6> 
                    </>
                  )
                })}
              </ul>
            
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper> 
            <h2 className="smallTitle">
              Meus amigos <span style={{color: '#C71585'}}>({peoplesFavorites.length})</span>
            </h2>
            <ul>
              {peoplesFavorites.slice(0,6).map((people) => {
                return(
                  <li key={people.id}>
                    <a href={`/users/${people.login}`}>
                        <img src={`https://github.com/${people.login}.png`} />
                        <span>{people.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title={"Seguidores"} items={seguidores} />
          <ProfileRelationsBoxWrapper> 
            <h2 className="smallTitle">
              Minhas Comunidades <span style={{color: '#C71585'}}>({comunidades.length})</span>
            </h2>
            <ul>
              {comunidades.slice(0,6).map((comunidade) => {
                return(
                  <li key={comunidade.id}>
                    <a href={`${comunidade.urlCommunity}`}>
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const {isAuthenticated} = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((response) => response.json())
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}

