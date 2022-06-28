import { useRecoilValue } from 'recoil';
import {
  likedImagesState,
  //nonLoginLikedImagesState,
} from '../recoil/apiCallSelector';
import '../styles/Look.css';
import NavBar from '../components/NavBar';
import Like from '../components/Like';
import { useEffect } from 'react';
import { authState } from '../recoil/authState';
import { child, push, ref } from 'firebase/database';
import { database } from '../components/firebase';
import { update } from 'lodash';
function Liked() {
  const getLikedImagesState = useRecoilValue(likedImagesState);
  const LikedImages = JSON.parse(getLikedImagesState); //로그인 좋아요
  // const getUnAuthedLikeImage = useRecoilValue(nonLoginLikedImagesState);
  const getUnAuthedLikeImage = sessionStorage.getItem('nonLoginLikedImages');
  const unAuthedLikeImage = JSON.parse(getUnAuthedLikeImage); //비로그인 좋아요
  const authUser = useRecoilValue(authState);

  useEffect(() => {
    if (unAuthedLikeImage && authUser) {
      //비로그인 세션 => 로그인 로컬로 옮기기
      unAuthedLikeImage.map((item) => {
        //비로그인/로그인 좋아요 중복 제거
        if (item.id !== LikedImages.id) {
          localStorage.setItem(
            'likedImages',
            JSON.stringify([...LikedImages, item])
          );
          //로컬로 옮기고 비로그인 세션 kill...
          sessionStorage.removeItem('nonLoginLikedImages');

          //파이어베이스 유저정보 저장
          const getCountReference = ref(
            database,
            `database/look/${item.id - 1}`
          );

          //likes안에 저장될 고유키 생성
          const newLikeKey = push(child(ref(database), `likes`)).key;

          //저장할 값 ( 이메일 , 고유키)
          const likeData = {
            user: authUser.email,
            uuid: newLikeKey,
          };

          //유저 저장
          const updates = {};
          updates[`/database/look/${item.id - 1}/likes/` + newLikeKey] =
            likeData;
          update(ref(database), updates);

          //카운트+1
          update(getCountReference, {
            count: item.count + 1,
          });
        }
      });
    }
  }, [LikedImages, authUser, unAuthedLikeImage]);

  return (
    <>
      <NavBar />
      <div className='card likedPage'>
        {getLikedImagesState ? (
          LikedImages.map((item, idx) => (
            <div key={idx}>
              <img src={item.src} key={item.id} className='image' />
              <div className='icon-wrapper'>
                <Like images={item} />
              </div>
            </div>
          ))
        ) : (
          <div>이미지에 좋아요를 눌러보세요</div>
        )}
      </div>
    </>
  );
}

export default Liked;
