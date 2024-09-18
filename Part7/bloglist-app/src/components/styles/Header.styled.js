import styled from 'styled-components'

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;

  a {
    font-size: 30px;
    font-weight: 700;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.bg};
    padding: 0 10px;
  }

  p {
    align-content: center;
    justify-self: end;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.bg};
  }
`
export const Logo = styled.img`
  object-fit: contain;
`

export const Nav = styled.nav``
