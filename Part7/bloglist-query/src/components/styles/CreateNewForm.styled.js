import styled from 'styled-components'

export const CreateNewForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  border: none;
  border-radius: 1em;
  background-color: ${({ theme }) => theme.colors.header};
  max-width: 500px;
  width: 100%;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

export const StyledCancelBtn = styled.button`
  // align-self: flex-end;
  margin-left:380px;
  border-radius: 50%;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background-color: ${({ bg }) => bg || '#fff'};
  color: ${({ theme }) => theme.colors.header};

  &: hover {
    opacity: 0.9;
    transform: scale(0.98);
`
