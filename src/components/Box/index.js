import styled from "styled-components";

export const Box = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  
  margin-bottom: 10px;
  .boxLink {
    font-size: 15px;
    color: #C71585;
    text-decoration: none;
    font-weight: 600;
  }
  .title {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  .authorName {
    font-size: 13px;
    margin-top: 10px;
  }
  .comment {
    font-size: 17px;
    font-weight: inherit;
    margin-bottom: 20px;
    margin-left: 2%;
  }
  .authorCard {
    margin-left: 2%;
    margin-bottom: 2px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #363636;
  }
`; 


export default Box;