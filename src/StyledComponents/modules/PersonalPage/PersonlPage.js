import styled from "styled-components";
import theme from "../../theme/theme";

export const Container = styled.div`
  margin: auto;
  background-color: white;
  min-width: 0;
  height: 100%;
  min-height: 100vh;
  // 768px 이상일 때;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
   background-color: #fac0bb;
   min-width:768px
   max-width:1280px;
   
   width:100%;
   display :flex; 
    height:100%;
    min-height: 100vh;
  `};

  // 1200px 이상일 때;
  ${({ theme }) => theme.mediaQuery.lg`
  background-color: #fac0bb;
  max-width: 1280px;
  display :flex; 
  height:100%;
  min-height: 100vh;
  `};
`;

export const ProfileWrap = styled.div``;
export const ProfileBox = styled.div`
  box-shadow: 3px 4px 9px 0px rgba(0, 0, 0, 0.3);

  width: 100%;
  height: 600px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    margin: 30px;
    width: 400px;
    background-color:white;
    border-radius:30px;
    background-color: white;
    max-height:90vh;
  `};

  // 1200px 이상일 때;
  ${({ theme }) => theme.mediaQuery.lg`
  margin: 30px;
  background-color :white;
  width: 400px;
  `};
`;
export const HeadBox = styled.div`
  margin: 40px 0px 70px 0px;
`;
export const HeadText = styled.h1`
  width: 100%;
  font-size: 30px;
  font-weight: 600;
`;
export const Edit = styled.img`
  position: relative;
  left: 95px;
  padding: 1px;
  width: 20px;
  height: 20px;
  object-fit: contain;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px 0px ${theme.defaultColor};
    transition: 0.5s;
    transform: scale(1.2);
  }
`;
export const AvatarWrap = styled.div`
  margin-top: -50px;
  margin-bottom: -10px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;
export const ImageLabel = styled.label`
  font-size: 16px;
  cursor: pointer;
`;
export const ChangeImg = styled.input`
  display: none;
`;
export const Confirm = styled.h1`
  color: white;
  background-color: #fac0bb;
  font-size: 13px;
  font-weight: 500;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.defaultColor};
    transition: 0.5s;
  }
`;

export const ProfileInfo = styled.section`
  width: 90%;
`;
export const Section = styled.section`
  height: ${(ea) => ea.height};
  gap: 10px;
  display: flex;
  margin: 10px;
  border-radius: 15px;
  padding: 18px;
  background-color: #fac0bb;
`;
// export const EmailSection = styled.section`
//   gap: 10px;
//   display: flex;
//   margin: 10px;
//   border-radius: 15px;
//   padding: 18px;
//   background-color: #fac0bb;
// `;

export const Span = styled.p`
  word-break: break-all;
  font-size: 12px;
`;
export const Span2 = styled.span``;
export const DirectSection = styled.section`
  display: flex;
  margin: 10px;
  gap: 20px;
  cursor: pointer;
`;
export const Direct = styled.span`
  font-size: 12px;
  color: black;
  cursor: pointer;
`;

//피드박스
export const FeedsBox = styled.div`
  margin: 50px 30px 50px 30px;
  padding: 10px;
  background-color: white;
  max-width: 768px;
  box-shadow: 3px 4px 9px 0px rgba(0, 0, 0, 0.3);
  ${({ theme: { mediaQuery } }) => mediaQuery.md`

    margin-top: 30px;
    padding: 10px;

    min-width: 200px;
    width: 100%;
    max-width: 700

    background-color:white;
    border-radius:30px;
  `};

  // 1200px 이상일 때;
  ${({ theme }) => theme.mediaQuery.lg` 
  margin-top: 30px;
  padding: 10px;
  background-color: white;

  width: 100%;
  `};
`;

export const LabelWrap = styled.div`
  margin: 30px 0;
`;
export const FeedLabel = styled.label`
  border-bottom-style: solid;
  border-bottom-color: ${theme.defaultColor};
  border-bottom-width: 2px;
  padding-bottom: 3px;
  margin-left: 30px;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
`;
export const FeedsWrap = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    
    padding: 20px;
    gap: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    
  `};

  // 1200px 이상일 때;
  ${({ theme }) => theme.mediaQuery.lg` 
    

    padding: 20px;
    gap: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  `};
`;
export const Feed = styled.div`
  gap: 30px;
  font-size: 16px;
  background-color: #fac0bb;

  padding: 20px;
  width: 50%;
  height: 200px;

  cursor: pointer;
  border-radius: 20px;
  box-shadow: 1px 2px 6px 3px rgba(0, 0, 0, 0.3);
  &:hover {
    transition: 1s;
    transform: scale(1.1, 1.1);
  }

  ${({ theme: { mediaQuery } }) => mediaQuery.md`
  background-color: #fac0bb;

 

  height: 200px;
  padding: 20px;
  border-radius: 20px;
  `};

  // 1200px 이상일 때;
  ${({ theme }) => theme.mediaQuery.lg` 
  background-color: #fac0bb;

  
  width:300px;
  height: 250px;
  padding: 20px;
  border-radius: 20px;
  `};
`;

export const MyNews = styled.img`
  margin-bottom: 10px;
  width: 100%;
  height: 70%;
  border-radius: 10px;
`;
export const TextWrap = styled.div`
  color: white;
  width: 100%;
  border-radius: 10px;
`;
export const MyText = styled.p`
  font-weight: ${(f) => f.weight};
  margin-bottom: 10px;
  width: 100%;
  color: ${(c) => c.color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${(f) => f.size};
`;
