import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import { editPost, removePost } from "../../redux/modules/post";
function SamplePersonal() {
  const post = useSelector((state) => state.post);

  /* 
  user도 수정해줄까? 아니면 어차피 전체 post에서 삭제 했으니까 상세페이지 들어가면 filter로 그냥 처리해줄까 고민이 되네요

  
   */
  const user = useSelector((state) => state.user);
  console.log(user.currentUser);
  const dispatch = useDispatch();
  const textRef = useRef();
  const [fireStoreUpdateData, setFireStoreUpdateDate] = useState();
  const [fireStoreRemoveDate, setFireStoreRemoveDate] = useState();
  //클릭하면 업뎃 으로 바꾸기
  const handleEdit = (id) => () => {
    const findTargetIndex = post.findIndex((target) => target.id === id);
    post[findTargetIndex].isEdit = true;
    dispatch(editPost([...post]));
  };
  // 클릭하면 업뎃 또는 return으로 함수 종료
  const handleUpdate = (prev) => (id) => {
    if (prev === textRef.current.value) return alert("수정해주세요");
    const findTargetIndex = post.findIndex((target) => target.id === id);
    post[findTargetIndex].text = textRef.current.value;
    post[findTargetIndex].isEdit = false;
    setFireStoreUpdateDate({ ...post[findTargetIndex] });
    dispatch(editPost([...post]));
  };
  // 화면 먼저 그려주고 useEffect안에서 데이터 몰래 update하기;
  const updateFireStoreData = useCallback(async () => {
    const userDataRef = doc(db, `users`, fireStoreUpdateData.id);
    try {
      await updateDoc(userDataRef, fireStoreUpdateData).then(() => console.log("update완료"));
    } catch (e) {
      console.log(e);
    }
  }, [fireStoreUpdateData]);
  useEffect(() => {
    if (!fireStoreUpdateData) return;
    else {
      updateFireStoreData();
      return;
    }
  }, [fireStoreUpdateData, updateFireStoreData]);

  // 삭제 함수임
  const onClickDeleteData = (id) => () => {
    setFireStoreRemoveDate(id);
    const newPosts = post.filter((target) => target.id !== id);
    alert("정말 삭제??");
    dispatch(removePost(newPosts));
  };
  const deleteFireStoreData = useCallback(async () => {
    const removeDataRef = doc(db, "users", fireStoreRemoveDate);
    try {
      await deleteDoc(removeDataRef).then(() => console.log("삭제완료"));
    } catch (e) {
      console.log(e);
    }
  }, [fireStoreRemoveDate]);
  useEffect(() => {
    if (!fireStoreRemoveDate) return;
    else {
      deleteFireStoreData();
    }
  }, [deleteFireStoreData, fireStoreRemoveDate]);
  console.log(post);
  return (
    <div>
      {post.map((el, i) => {
        return (
          <DivContainer key={el.id}>
            <Div>
              <img src={el.imgurl} alt="" />
              <TextAreaForwad props={el} ref={textRef} />
              {user.currentUser && (
                <ConditionalButtonGroup
                  el={el}
                  handleEdit={handleEdit}
                  handleUpdate={handleUpdate}
                  onClickDeleteData={onClickDeleteData}
                />
              )}
            </Div>
          </DivContainer>
        );
      })}
    </div>
  );
}

export default SamplePersonal;

const TextAreaForwad = forwardRef(({ props: { isEdit, text } }, ref) => {
  const onChange = (e) => {
    ref.current.value = e.target.value;
  };
  return <TextArea $isEdit={isEdit} defaultValue={text} ref={ref} onChange={onChange} />;
});

const ConditionalButtonGroup = ({ el, handleEdit, handleUpdate, onClickDeleteData }) => {
  return (
    <>
      {!el.isEdit ? (
        <Btn onClick={handleEdit(el.id)}>수정</Btn>
      ) : (
        <Btn
          onClick={() => {
            handleUpdate(el.text)(el.id);
          }}
        >
          업뎃
        </Btn>
      )}{" "}
      <Btn onClick={onClickDeleteData(el.id)}>삭제</Btn>
    </>
  );
};
const TextArea = styled.textarea.attrs((props) => ({
  readOnly: props.$isEdit === false ? true : false
}))`
  resize: none;
  width: 200px;
  padding: 20px;
  cursor: text;
`;
const DivContainer = styled.div`
  padding: 20px;
  height: 400px;
  display: flex;
  justify-content: center;
  img {
    width: 400px;
    object-fit: cover;
    aspect-ratio: 1/1;
  }
  p {
    color: #fff;
    font-size: 32px;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 1200px;
  padding: 20px;
  background-color: ${({ theme }) => theme.defaultColor};
`;
const Btn = styled.div`
  width: 120px;
  height: 40px;
  padding: 30px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border: 1px solid #333;
  background-color: #000;
  &:hover {
    background-color: #fff;
    color: #333;
  }
`;
