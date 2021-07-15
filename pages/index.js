import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSideBar(propriedades) {
  return(
    <img style={{borderRadius: '8px'}} src={`https://github.com/${propriedades.githubUser}.png`} />
  )
}
export default function Home() {
  const githubUser = 'monique2002';
  const peoplesFavorites = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  
  return (
    <>
    <AlurakutMenu />
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
      </div>
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper> 
          <h2 className="smallTitle">
            Pessoas da comunidade ({peoplesFavorites.length})
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
      </div>
    </MainGrid>
    </>
  )
}
