import React, { useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import styled from 'styled-components';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const ProfileSidebar = (props) => {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

const GroupRenders = ({ array, groupName }) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {groupName} ({array.length})
      </h2>

      <ul>
        {array.slice(0, 6).map(item => {
          return (
            <li key={item.id}>
              <a href={item.link ? item.link : 'https://picsum.photos/'} target="_blank">
                <img src={item.image ? item.image : `https://github.com/${item.name}.png`} />
                <span>{item.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'Jorge-Neto';
  const [comunidades, setComunidades] = useState([{
    id: 23242342342342342343454,
    name: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = [
    { id: 123, name: 'omariosouto', link: 'https://www.youtube.com/c/DevSoutinho' },
    { id: 234, name: 'peas', link: 'https://cursos.alura.com.br/user/paulo-silveira' },
    { id: 345, name: 'juunegreiros', link: 'https://twitter.com/juunegreiros' },
    { id: 456, name: 'rafaballerini', link: 'https://github.com/rafaballerini' },
    { id: 567, name: 'marcobrunodev', link: 'https://www.instagram.com/marcobrunodev/' },
    { id: 789, name: 'felipefialho', link: 'https://github.com/felipefialho' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const dadosForm = new FormData(event.target);

    const comunidade = {
      id: new Date().getTime(),
      name: dadosForm.get('title'),
      image: dadosForm.get('image') ? dadosForm.get('image') : 'https://placehold.it/300x300'
    }
    return setComunidades([...comunidades, comunidade])
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet recados={1} fotos={3} fas={10} mensagens={99} legal={3} confiavel={3} sexy={2} />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para ser usada de capa"
                  name="image"
                  aria-label="Coloque uma URL para ser usada de capa"
                  required
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelarionsArea" style={{ gridArea: 'profileRelarionsArea' }}>
          <GroupRenders array={comunidades} groupName={'Comunidades'} />

          <GroupRenders array={pessoasFavoritas} groupName={'Pessoas Favoritas'} />
        </div>
      </MainGrid>
    </>
  )
}
