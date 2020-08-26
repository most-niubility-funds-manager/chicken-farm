import styled from 'styled-components'
import Color from 'color'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  height: 32px;
  padding: 0 10px;
`

const Title = styled.p`
  font-size: 12px;
  display: flex;
  align-items: center;
  color: ${props => Color(props.theme.normal).alpha(0.5)};
`

const Marquee = styled.div`
  width: 100%;
  height: 32px;
  overflow: hidden;
`

const LinkWrapper = styled.p`
  display: flex;
  transform: translate3d(0,0,0);
  align-items: center;
  height: 32px;
  transition: all 0.2s linear;

  a {
    flex-shrink: 0;
    color: ${props => props.theme.marqueeColor};
    margin-right: 10px;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }
`

export { Wrapper, Marquee, Title, LinkWrapper }