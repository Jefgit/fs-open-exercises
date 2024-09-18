import styled from 'styled-components'

export const StyledCommentSection = styled.div`
  width: 1000px;

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  textarea {
    resize: none;
    font-size: 1rem;
    border-radius: 1em;
    padding: 1em;
    border: none;
  }

  button {
    align-self: flex-end;
  }
`

export const StyledComments = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  list-style-type: none;

  li {
    background-color: #a9a9a9;
    width: 100%;
    border-radius: 1em;
    padding: 0.3em;
    max-width: 30em;
    min-height: 5em;
  }
`
