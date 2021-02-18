import styled from 'styled-components';

const Buttonicon = styled.button`
   width: 67px;
   height: 67px;
   display: block;
   border-radius: 20px;
   background-image: url(${({icon}) => icon});
   background-repeat: no-repeat;
   background-position: 50% 50%;
   cursor: pointer;
   background-size: 40%;
   border: none;

   &.active {
      background-color: white;
   }
`;


export default Buttonicon;