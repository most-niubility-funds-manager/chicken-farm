import styled from 'styled-components'

const Wrapper = styled.div.attrs({ className: 'news-wrapper' })`
  width: 100%;
  height: 100%;
  overflow: overlay;
  padding: 10px;
`

const Item = styled.a`
  background-color: ${props => props.theme.tabNewsBg};
  color: ${props => props.theme.tabNewsText};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  padding: 10px;
  box-sizing: content-box;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${props => props.theme.tabNewBorder};

  p {
    width: 260px;
    white-space: pre-wrap;
    line-height: 1.5;
  }

  &:hover {
    background-color: ${props => props.theme.tabNewHover};
  }
`

export { Wrapper, Item }