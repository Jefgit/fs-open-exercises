import styled from 'styled-components'

export const StyledBlogs = styled.div`
    width:100vw;
    height:100vh;
    max-width:100%;
    padding: 50px 80px;
    margin 0 auto;
    background-color: ${({ theme }) => theme.colors.body};

    h1 {
      color: #500;
    }
`
export const StyledBlog = styled.article`
  background-color: ${({ bg }) => bg};
  border-radius: 10px;
  padding: 10px;
  margin: 10px auto;

  a {
    text-decoration: none;
    color: #500;
  }
`
