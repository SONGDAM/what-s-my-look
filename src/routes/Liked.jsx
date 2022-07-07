import { useRecoilValue } from 'recoil';
import '../styles/global.css';
import {
  likedImagesState,
  nonLoginLikedImagesState,
} from '../recoil/apiCallSelector';
import '../styles/Look.css';
import NavBar from '../components/NavBar';
import Like from '../components/Like';
import { useEffect } from 'react';
import { authState } from '../recoil/authState';
import { update, ref, push, child, onValue } from 'firebase/database';
import { database } from '../components/firebase';
import _ from 'lodash';

function Liked() {
  const getLikedImagesState = useRecoilValue(likedImagesState);
  const likedImages = JSON.parse(getLikedImagesState); //로그인 좋아요
  const getUnAuthedLikeImage = useRecoilValue(nonLoginLikedImagesState);
  const unAuthedLikeImage = JSON.parse(getUnAuthedLikeImage); //비로그인 좋아요
  const authUser = useRecoilValue(authState);

  useEffect(() => {
    //파이어베이스 유저정보 저장
    const saveUserFirebase = (item) => {
      const imageIndex = item.id - 1;
      const getCountReference = ref(database, `database/look/${imageIndex}`);

      //likes안에 저장될 고유키 생성
      const newLikeKey = push(child(ref(database), `likes`)).key;

      //저장할 값 ( 이메일 , 고유키)
      const likeData = {
        user: authUser.email,
        uuid: newLikeKey,
      };

      //유저 중복 체크
      onValue(
        ref(database, `database/look/${imageIndex}/likes`),
        (snapshot) => {
          if (snapshot.exists()) {
            const user = Object.values(snapshot.val());
            if (user.map((item) => item.user !== authUser.email)) {
              const updates = {};
              updates[`/database/look/${imageIndex}/likes/` + newLikeKey] =
                likeData;
              update(ref(database), updates);

              //카운트+1
              update(getCountReference, {
                count: item.count + 1,
              });
              return;
            }
            console.log('already exists...');
          }
          const updates = {};
          updates[`/database/look/${imageIndex}/likes/` + newLikeKey] =
            likeData;
          update(ref(database), updates);

          //카운트+1
          update(getCountReference, {
            count: item.count + 1,
          });
        }
      );
    };

    //로그인했을 때 비로그인 좋아요 사진 있다면
    if (unAuthedLikeImage && authUser) {
      //비로그인 좋아요 O & 로그인 좋아요 X
      if (!likedImages) {
        localStorage.setItem('likedImages', JSON.stringify(unAuthedLikeImage));
        unAuthedLikeImage.map((item) => saveUserFirebase(item));
        //로컬로 옮기고 비로그인 세션 삭제
        sessionStorage.removeItem('nonLoginLikedImages');
        return;
      }

      //비로그인 좋아요 O & 로그인 좋아요 O
      if (likedImages) {
        let dataArray = [];
        dataArray = likedImages;

        Object.keys(unAuthedLikeImage).map((key) => {
          dataArray.push(unAuthedLikeImage[key]);
        });

        dataArray = _.uniqBy(dataArray, 'id');
        dataArray = [...dataArray];
        localStorage.setItem('likedImages', JSON.stringify(dataArray));

        Object.keys(dataArray).map((key) => saveUserFirebase(dataArray[key]));

        //로컬로 옮기고 비로그인 세션 삭제
        sessionStorage.removeItem('nonLoginLikedImages');
      }
    }
  }, [authUser, likedImages, unAuthedLikeImage]);
  return (
    <>
      <NavBar />
      <section>
        <div className='card likedPage'>
          {likedImages ? (
            likedImages.length > 0 ? (
              Object.values(likedImages).map((item, idx) => (
                <div key={idx}>
                  <img src={item.src} key={item.id} className='image' />
                  <div className='icon-wrapper'>
                    <Like images={item} />
                  </div>
                </div>
              ))
            ) : (
              <div>이미지에 좋아요를 눌러보세요</div>
            )
          ) : (
            <div>이미지에 좋아요를 눌러보세요</div>
          )}
        </div>
      </section>
    </>
  );
}

export default Liked;
