import styled from 'styled-components'

export const StyledTable = styled.table`
  border: none;
  border-radius: 1em;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.content};
  font-size: 20px;

  th,
  td {
    border-radius: 5px;
    border: 3px inset #c0c0c0;
    padding: 10px;
    text-align: left;
  }

  a {
    text-decoration: none;
    color: #500;
  }
`
