import { useRecoilValue } from 'recoil';
import {
  likedImagesState,
  nonLoginLikedImagesState,
} from '../recoil/apiCallSelector';
import '../styles/Look.css';
import NavBar from '../components/NavBar';
import Like from '../components/Like';
import { useEffect } from 'react';
import { authState } from '../recoil/authState';
import { update, ref, push, child } from 'firebase/database';
import { database } from '../components/firebase';

function Liked() {
  const getLikedImagesState = useRecoilValue(likedImagesState);
  const likedImages = JSON.parse(getLikedImagesState); //로그인 좋아요
  const getUnAuthedLikeImage = useRecoilValue(nonLoginLikedImagesState);
  const unAuthedLikeImage = JSON.parse(getUnAuthedLikeImage); //비로그인 좋아요
  const authUser = useRecoilValue(authState);

  // const [unAuthImages, setUnAuthImages] = useState({});

  // useEffect(() => {
  //   const res = async () => {
  //     fetch(
  //       `https://what-s-my-look-default-rtdb.firebaseio.com/database/look.json`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setLookData(data));
  //   };
  //   res();

  // function jsonSpliter(object) {
  //   Object.keys(lookData).map(function (key) {
  //     if (typeof object[key] === 'object') {
  //       jsonSpliter(object[key]);
  //       console.log(object[key]);
  //     } else {
  //       console.log(object[key]);
  //     }
  //   });
  // }
  // jsonSpliter();

  // Object.keys(lookData).filter((key) => {
  //   const keys = lookData[key].likes;
  //   if (keys) {
  //     const values = Object.values(keys).filter(
  //       (item) => item.user === authUser.email
  //     );
  //     setLookData(values);
  //     console.log(values);
  //   }
  // });
  // }, [authUser.email, lookData]);

  useEffect(() => {
    //파이어베이스 유저정보 저장
    const saveUserFirebase = (item) => {
      const getCountReference = ref(database, `database/look/${item.id - 1}`);

      //likes안에 저장될 고유키 생성
      const newLikeKey = push(child(ref(database), `likes`)).key;

      //저장할 값 ( 이메일 , 고유키)
      const likeData = {
        user: authUser.email,
        uuid: newLikeKey,
      };

      //유저 저장
      const updates = {};
      updates[`/database/look/${item.id - 1}/likes/` + newLikeKey] = likeData;
      update(ref(database), updates);

      //카운트+1
      update(getCountReference, {
        count: item.count + 1,
      });
    };

    //로그인했을 떄 비로그인 좋아요 사진 있다면
    if (unAuthedLikeImage && authUser) {
      //비로그인 좋아요 O & 로그인 좋아요 X
      if (!likedImages) {
        localStorage.setItem('likedImages', JSON.stringify(unAuthedLikeImage));
        unAuthedLikeImage.forEach((item) => saveUserFirebase(item));
        //로컬로 옮기고 비로그인 세션 kill...
        sessionStorage.removeItem('nonLoginLikedImages');
        return;

        //비로그인 좋아요 O & 로그인 좋아요 O
      } else if (likedImages) {
        const filterImage = unAuthedLikeImage.filter(
          (item) => item.id !== likedImages.id
        );

        console.log(
          '?',
          filterImage.map((item) => item)
        );
        // const filter = filterImage.map((item) => item);
        // const selectImage = filterImage
        // let newArr = [...likedImages, filterImage];

        JSON.parse(localStorage.getItem('likedImages')).push(filterImage);

        // saveUserFirebase(filterImage);
        filterImage.forEach((item) => saveUserFirebase(item));

        // //로컬로 옮기고 비로그인 세션 kill...
        sessionStorage.removeItem('nonLoginLikedImages');
      }

      //비로그인 좋아요 O & 로그인 좋아요 O
      // unAuthedLikeImage.filter((item) => {
      //   //비로그인/로그인 좋아요 중복 제거
      //   if (item.id !== likedImages.id) {
      //     console.log('item', item);
      //     localStorage.setItem(
      //       'likedImages',
      //       JSON.stringify([...likedImages, item])
      //     );
      //     saveUserFirebase(item);
      //   }
      // });
      // if(likedImages){

      // }

      //   Object.keys(unAuthedLikeImage).map(function (key) {
      //     // if (unAuthedLikeImage[key].id !== likedImages.id) {
      //     console.log(unAuthedLikeImage[key]);
      //     setUnAuthImages(unAuthedLikeImage[key]);
      //     saveUserFirebase(unAuthedLikeImage[key]);
      //     // }
      //   });
      //   localStorage.setItem(
      //     'likedImages',
      //     JSON.stringify([...likedImages, unAuthImages])
      //   );
    }

    // //로컬로 옮기고 비로그인 세션 kill...
    sessionStorage.removeItem('nonLoginLikedImages');
  }, [authUser, likedImages, unAuthedLikeImage]);

  return (
    <>
      <NavBar />
      <div className='card likedPage'>
        {likedImages ? (
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
        )}
        {/* {Object.values(lookData).map((item, index) => (
          <div key={index}>
            <img src={item.src} key={item.id} className='image' />
            <div className='icon-wrapper'>
              <Like images={item} />
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}

export default Liked;
