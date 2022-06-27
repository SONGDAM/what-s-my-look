import { useRecoilValue } from 'recoil';
import { likedImagesState } from '../recoil/apiCallSelector';
import '../styles/Look.css';
import NavBar from '../components/NavBar';
import Like from '../components/Like';
import { useEffect } from 'react';
import { authState } from '../recoil/authState';
import { child, onValue, push, ref, update } from 'firebase/database';
import { database } from '../components/firebase';
function Liked() {
  const getLikedImagesState = useRecoilValue(likedImagesState);
  const LikedImages = JSON.parse(getLikedImagesState); //로그인 좋아요
  const getUnAuthedLikeImage = sessionStorage.getItem('nonLoginLikedImages');
  const unAuthedLikeImage = JSON.parse(getUnAuthedLikeImage); //비로그인 좋아요
  const authUser = useRecoilValue(authState);

  useEffect(() => {
    if (unAuthedLikeImage && authUser) {
      localStorage.setItem('likedImages', JSON.stringify(unAuthedLikeImage));

      const getLikedImages = JSON.parse(localStorage.getItem('likedImages'));
      const deleteLikedImages = getLikedImages.filter(
        (item) => item.id !== unAuthedLikeImage.id
      );

      localStorage.setItem('likedImages', JSON.stringify(deleteLikedImages));
    }
  }, [authUser, unAuthedLikeImage]);

  //파이어베이스 각 이미지 likes에 유저이메일 저장
  const newLikeKey = push(child(ref(database), `likes`)).key;

  const likeData = {
    user: authUser.email,
    uuid: newLikeKey,
  };

  const imageIndex = unAuthedLikeImage.map((item) => item.id - 1);
  const getLikesUserReference = ref(
    database,
    `database/look/${imageIndex}/likes`
  );
  const getCountReference = ref(database, `database/look/${imageIndex}`);

  //유저 이메일 중복 제거
  onValue(getLikesUserReference, (snapshot) => {
    if (snapshot.exists()) {
      const user = Object.values(snapshot.val());

      if (user.find((user) => user.user !== authUser.email)) {
        //유저 이메일 업데이트
        const updates = {};
        updates[`/database/look/${imageIndex}/likes/` + newLikeKey] = likeData;
        update(ref(database), updates);

        update(getCountReference, {
          count: unAuthedLikeImage.count + 1,
        });
      }
    }
  });

  // console.log(getLikedImagesState.length > 0 ? '있음' : '없음');
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
