import styled from 'styled-components';

const MainGrid = styled.main`
  display: grid;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea {
    display: none;
    @media screen and (min-width: 860px) {
      display: block;
    }
  }

  @media screen and (min-width: 860px) {
    max-width: 1110px;
    grid-template-areas:
    "profileArea welcomeArea profileRelarionsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`

export default MainGrid
