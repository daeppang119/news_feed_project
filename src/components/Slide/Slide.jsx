import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import * as St from "../../StyledComponents/modules/StyledSlide/StyledSlide";
import { storage } from "../../firebase/firebase";
// 이미지가 하나이면 하나보여주고 이미지 여러개 이면 여러개처리
// 이미지 여러개 처리 할 때 슬라이더 형식으로 보여주고 싶다.

function Slide() {
  const [showImages, setShowImages] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const previewImages = (e) => {
    const imageList = e.target.files;
    let imagesUrl = [...showImages];

    for (let i = 0; i < imageList.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageList[i]);
      imagesUrl.push(currentImageUrl);
    }

    if (imagesUrl.length > 5) {
      imagesUrl.splice(0, 5);
    }
    setShowImages(imagesUrl);
  };
  function SlideModal({ showImages, setShowImages }) {
    const [imageIndex, setImageIndex] = useState(0);
    const showNextImage = () => {
      setImageIndex((idx) => {
        if (idx === showImages.length - 1) return 0;
        return idx + 1;
      });
    };
    const showPrevImage = () => {
      setImageIndex((idx) => {
        if (idx === 0) return showImages.length - 1;
        return idx - 1;
      });
    };
    const handleDeleteImage = (id) => () => {
      const editImages = showImages.filter((_, idx) => idx !== id);
      setShowImages(editImages);
    };
    return (
      <St.SliderContainer>
        <div>
          <div className="slide-wrapper">
            {showImages.map((url, id) => {
              return (
                <div style={{ flexShrink: "0" }}>
                  <img key={url} src={url} alt="" style={{ translate: `${-100 * imageIndex}%` }} />;
                  <St.DeleteImage onClick={handleDeleteImage(id)}>x</St.DeleteImage>
                </div>
              );
            })}

            <div className="button-group">
              <button
                className="right-button"
                style={{ right: "0", display: `${imageIndex === showImages.length - 1 ? "none" : "block"}` }}
                onClick={showNextImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>
              <button
                className="left-button"
                style={{ left: "0", display: `${imageIndex === 0 ? "none" : "block"}` }}
                onClick={showPrevImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </St.SliderContainer>
    );
  }
  // firebase에 올리는 함수입니다.
  const handleUpLoadPostImages = async () => {
    let photoUrlKeis = [];
    let imagesUrl = [];
    for (let i = 0; i < showImages.length; i++) {
      const postUrlKey = uuid();
      photoUrlKeis.push(postUrlKey);
      let upLoadImageRef = ref(storage, `${user.uid}/${postUrlKey}`);
      await uploadBytes(upLoadImageRef, showImages[i]);
      await getDownloadURL(upLoadImageRef).then((url) => imagesUrl.push(url));
    }
  };
  return (
    <St.Div>
      {showImages.length ? <SlideModal showImages={showImages} setShowImages={setShowImages} /> : null}
      <div style={{ margin: "20px" }}>
        <input type="file" onChange={previewImages} multiple />
        <button>확인</button>
      </div>
      <button style={{ cursor: "pointer" }} onClick={handleUpLoadPostImages}>
        올리기
      </button>
    </St.Div>
  );
}

export default Slide;
