import styled from 'styled-components'

export const StyledNotification = styled.div`
  background-color: ${({ bg }) => bg};
  display: ${(display) => display};
  padding: 0.1em;

  p {
    text-align: center;
  }
`
