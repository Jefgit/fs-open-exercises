import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  align-content: center;
  gap: 15px;
`

export const StyledInput = styled.div`
  font-size: 16px;
  display: flex;
  gap: 10px;
  margin: 10px 0;
  justify-content: center;
  align-content: center;

  input {
    font-size: 16px;
    border-radius: 5px;
    border: none;
    padding: 5px;
  }

  label {
    font-size: 20px;
    color: #500;
    text-align: left;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    align-text: left;
    gap: 1px;

    label {
      text-align: left;
    }

    input {
      width: 100%;
    }
  }
`
