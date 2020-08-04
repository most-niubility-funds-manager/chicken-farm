import styled from 'styled-components'

const Wrapper = styled.div.attrs({ className: 'news-wrapper' })`
  width: 100%;
  height: 100%;
  overflow: overlay;
  padding: 10px;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-row-gap: 10px;
`

const Item = styled.a`
  background-color: ${props => props.theme.tabNewsBg};
  color: ${props => props.theme.tabNewsText};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px;

  p {
    width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    text-decoration: underline;
  }
`

export { Wrapper, Item }