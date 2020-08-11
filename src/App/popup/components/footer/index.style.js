import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'footer' })`
  width: 100%;
  height: 36px;
  position: absolute;
  bottom: 0;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  background-color: ${props => props.theme.footer};
  color: ${props => props.theme.normal};
  
`

const StateBox = styled.div.attrs({ className: 'state-box' })`
  width: 60px;
  height: 24px;
  font-size: 12px;
  color: ${props => props.theme.normal};
  text-align: center;
  line-height: 2;
  border-radius: 2px;
  background-color: ${props => props.isOpen ? props.theme.field : props.theme.status};
`

const NewsBox = styled.a.attrs({ className: 'news-box' })`
  width: 240px;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.theme.normal};
  margin-right: auto;
  margin-left: 20px;

  &:hover {
    text-decoration: underline;
  }
`

const Toolbar = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;

export { Wrapper, StateBox, NewsBox, Toolbar }
