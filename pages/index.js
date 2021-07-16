import { useEffect, useState } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

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
        {propriedades.items.map((seguidor) => {
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

export default function Home() {
  const [seguidores, setSeguidores] = useState([]);
  const [comunidades, setComunidades] = useState([{
    title: 'Github',
    urlCommunity: 'https://github.com/',
    image: 'https://logosmarcas.net/wp-content/uploads/2020/12/GitHub-Logo.png'
  }]);
  useEffect(() => {
    fetch('https://api.github.com/users/monique24/followers')
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
  }, []);
 
  const githubUser = 'monique2002';
  const peoplesFavorites = [
    'Eric-Veludo',
    'ThamiresMadureira',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];
  
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <Box>
            <ProfileSideBar githubUser={githubUser}></ProfileSideBar>
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
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                urlCommunity: dadosForm.get('urlCommunity'),
                image: dadosForm.get('urlImage') ?
                        dadosForm.get('urlImage') 
                        : `https://picsum.photos/200/300?${Math.random()}`
              };

              const comunidadeAtualizada = [...comunidades, comunidade];
              setComunidades(comunidadeAtualizada);
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
              {peoplesFavorites.map((people) => {
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
              {comunidades.map((comunidade) => {
                return(
                  <li key={comunidade.id}>
                    <a href={`${comunidade.urlCommunity}`}>
                      <img src={comunidade.image} />
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
