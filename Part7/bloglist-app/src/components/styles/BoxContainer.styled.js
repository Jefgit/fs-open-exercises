import styled from 'styled-components'

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 1em;
  background-color: ${({ theme }) => theme.colors.header};
  margin: 10vh auto;
  max-width: 500px;
  width: 50%;
  padding: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
  }
`
