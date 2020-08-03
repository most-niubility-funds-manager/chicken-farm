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
  background-color: #000;
  color: #fff;
  &:hover {
    text-decoration: underline;
  }
`

export { Wrapper, Item }