import styled from 'styled-components'

const Wrapper = styled.div.attrs({ className: 'form-wrapper' })`
  width: 100%;
`

const InputWrapper = styled.div`
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
  color: ${props => props.theme.normal};
  display: grid;
  align-items: center;
  grid-gap: 10px;
  grid-template-columns: 60px 140px 140px;
  font-weight: bold;
`

const Input = styled.input`
  width: ${props => props.width || 140}px;
  height: 36px;
  border-radius: 4px;
  color: ${props => props.theme.normal};
  font-size: 12px;
  padding: 0 1em;
  background-color: ${props => props.theme.formInputBg};

  &[readonly] {
    background-color: ${props => props.theme.formInputReadonly};
  }
`

export { Wrapper, InputWrapper, Input }