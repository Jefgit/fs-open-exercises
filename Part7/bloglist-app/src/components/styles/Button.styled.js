import styled from 'styled-components'

export const Button = styled.button`
  border-radius: 50px;
  border: none;
  cursor: pointer;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background-color: ${({ bg }) => bg || '#fff'};
  color: ${({ theme }) => theme.colors.header};

  &: hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`
