import styled from 'styled-components/macro'

export const StyledEllipsis = styled('div')`
  font-size: 30px;
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    width: 0px;
    animation: ellipsis steps(4, end) 900ms infinite;
    content: '...';
  }
  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
`
