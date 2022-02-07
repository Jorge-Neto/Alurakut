import React, { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import nookies from 'nookies';
import jwt from 'jsonwebtoken'
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
              <a href={item.link} target="_blank">
                <img src={item.imageUrl} />
                <span>{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}


export default function Home(props) {
  const githubUser = props.githubUser;
  const [seguidores, setSeguidores] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const pessoasFavoritas = [];
    // { id: 456, title: 'rafaballerini', link: 'https://github.com/rafaballerini', imageUrl: 'https://github.com/rafaballerini.png' },

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => res.json())
      .then((obj) => {
        const followers = [];
        obj.forEach(item => {
          let follower = {
            id: item.id,
            title: item.login,
            imageUrl: item.avatar_url,
            link: item.url
          }
          followers.push(follower);
        });
        setSeguidores(followers);
      })
      .catch((e) => console.log('Error: ' + e))

    fetch('https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer 286309a0e729b0f22d6373977ca093`,
        },
        body: JSON.stringify({
          query: '{ allCommunities { id, title, imageUrl, link, creatorSlug } }'
        }),
      })
      .then(res => res.json())
      .then((res) => {
        setComunidades(res.data.allCommunities);
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dadosForm = new FormData(event.target);

    const comunidade = {
      title: dadosForm.get('title'),
      imageUrl: dadosForm.get('image') ? dadosForm.get('image') : 'http://placehold.it/300x300',
      link: ' ',
      creatorSlug: githubUser
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade)
    })
    .then(async res => await res.json())
    .then(res => setComunidades([...comunidades, res.obj]))


    return
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
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelarionsArea" style={{ gridArea: 'profileRelarionsArea' }}>
          <GroupRenders array={seguidores} groupName={'Seguidores'} />

          <GroupRenders array={comunidades} groupName={'Comunidades'} />

          <GroupRenders array={pessoasFavoritas} groupName={'Pessoas Favoritas'} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json());

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
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
