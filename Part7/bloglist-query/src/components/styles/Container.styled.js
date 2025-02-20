import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  margin-top: 20px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr [col-start]);
  gap: 1em;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
    flex-direction: column;
  }
`
