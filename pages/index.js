import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

const ProfileSidebar = (props) => {
  console.log(props)
  return (
    <Box>
      <img src={`https://github.com/${props.gitUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const gitUser = 'Jorge-Neto';
  const pessoasFavoritas = [
    'omariosouto',
    'peas',
    'juunegreiros',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitUser={gitUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelarionsArea" style={{ gridArea: 'profileRelarionsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map(pessoas => {
                return (
                  <li key={pessoas}>
                    <a href={`/users/${pessoas}`}>
                    <img src={`https://github.com/${pessoas}.png`} />
                    <span>{pessoas}</span>
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
