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
        {propriedades.title} ({propriedades.items.length})
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
  const user = props.githubUser;
  const peoplesFavorites = [
    'Eric-Veludo',
    'ThamiresMadureira',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/monique2002/followers')
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
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle"> 
              O que você deseja fazer? 
            </h2>
            <form onSubmit={function handleCriaComunidade(event) {
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
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper> 
            <h2 className="smallTitle">
              Meus amigos ({peoplesFavorites.length})
            </h2>
            <ul>
              {peoplesFavorites.slice(0,6).map((people) => {
                return(
                  <li key={people}>
                    <a href={`/users/${people}`}>
                      <img src={`https://github.com/${people}.png`} />
                        <span>{people}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper> 
            <h2 className="smallTitle">
              Minhas Comunidades ({comunidades.length})
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
          <ProfileRelationsBox title={"Seguidores"} items={seguidores} />
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

