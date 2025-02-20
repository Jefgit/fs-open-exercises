import styled from 'styled-components'

export const StyledBlogs = styled.div`
    display:flex;
    flex-direction:column;
    width:50vw;
    height:100vh;
    max-width:100%;
    padding: 50px 80px;
    margin 0 auto;
    background-color: ${({ theme }) => theme.colors.body};

    h1 {
      color: #500;
    }

    img {
      width:50%;
      height:500px;
    }
`
export const StyledBlog = styled.article`
  background-color: ${({ bg }) => bg};
  width: 250px;
  height: 350px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  img {
    width: 100%;
    height: 150px;
    border-radius: 12px;
  }

  a {
    text-decoration: none;
    color: #500;
    align-self: flex-start;
  }
`
