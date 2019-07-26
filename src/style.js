import { injectGlobal } from 'styled-components'

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Microsoft Yahei", sans-serif, tahoma;
  }
  #root {
    overflow: hidden;
  }
  input,
  select,
  option {
    outline: none;
    border: 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clear-fix::after {
    content: '';
    display: table;
    clear: both;
  }
  a {
    color: #666;
    text-decoration: none;
  }
  ul,
  ol,
  li {
    list-style: none;
  }
`
