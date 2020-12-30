import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    outline:0;
}
body{
  background:#5a585e;
  color:#fff;
  -webkit-font-smoothing: antialiased;
}

body, input, button{
  font-family: 'Robot Slab', serif;
  font-size: 16px;
}

h1, h3, h4, h5, h6, strong{
  font-weight: 500;
}

button{
  cursor: pointer;
}
`;
