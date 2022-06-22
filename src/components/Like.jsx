import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useState, useEffect } from 'react';
import { update, ref, onValue, push, child, remove } from 'firebase/database';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authState';
import { database } from './firebase';

function Like({ images }) {
  const [isLike, setisLike] = useState(false);
  const [lookDatabase, setLookDatabase] = useState([]);

  const imageIndex = images.id - 1;
  const authUser = useRecoilValue(authState);
  const getLikesUserReference = ref(
    database,
    `database/look/${imageIndex}/likes`
  );
  const getCountReference = ref(database, `database/look/${imageIndex}`);

  useEffect(() => {
    const res = async () => {
      fetch(
        `https://what-s-my-look-default-rtdb.firebaseio.com/database/look/${imageIndex}.json`
      )
        .then((response) => response.json())
        .then((data) => setLookDatabase(data));
    };
    res();
  }, [imageIndex, isLike]);

  //페이지 로딩 시 유저가 좋아요 했으면 빨간 하트
  useEffect(() => {
    onValue(getLikesUserReference, (snapshot) => {
      if (snapshot.exists()) {
        const user = Object.values(snapshot.val()); //유저이메일
        //로그인했을 때 이미지별 좋아요 눌린 유저중에 로그인 유저랑 같은 사람이 있는지
        if (authUser) {
          if (user.find((item) => item.user === authUser.email)) {
            setisLike(true);
          }
        }
      }
    });
  }, [getLikesUserReference, authUser, imageIndex]);

  //좋아요 클릭 시
  const toggleLike = () => {
    if (!authUser) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    if (isLike) {
      downLike();
      deletelikedImages();

      return;
    }
    upLike();
    addLikedImages();
  };

  //좋아요
  const upLike = () => {
    setisLike(true);

    //likes안에 저장될 고유키 생성
    const newLikeKey = push(child(ref(database), `likes`)).key;

    //저장할 값 ( 이메일 , 고유키)
    const likeData = {
      user: authUser.email,
      uuid: newLikeKey,
    };

    //유저 저장
    const updates = {};
    updates[`/database/look/${imageIndex}/likes/` + newLikeKey] = likeData;
    update(ref(database), updates);

    //카운트+1
    update(getCountReference, {
      count: lookDatabase.count + 1,
    });
  };

  //좋아요 취소
  const downLike = () => {
    setisLike(false);

    //유저제거
    if (lookDatabase.likes) {
      const toArray = Object.values(lookDatabase.likes);
      const userFilter = toArray.filter((item) => item.user === authUser.email);
      const likesUuid = userFilter[0].uuid;

      const removeUserReference = ref(
        database,
        `database/look/${imageIndex}/likes/${likesUuid}`
      );

      remove(removeUserReference);

      //카운트-1
      update(getCountReference, {
        count: lookDatabase.count - 1,
      });
    }
  };

  //선택된 이미지 로컬에 추가
  const addLikedImages = () => {
    const preveLikedImages = JSON.parse(
      localStorage.getItem('likedImages') || '[]'
    );

    localStorage.setItem(
      'likedImages',
      JSON.stringify([...preveLikedImages, images])
    );
  };

  //선택된 이미지 로컬에 제거
  const deletelikedImages = () => {
    const getLikedImages = JSON.parse(localStorage.getItem('likedImages'));
    const deleteLikedImages = getLikedImages.filter(
      (item) => item.id !== images.id
    );

    localStorage.setItem('likedImages', JSON.stringify(deleteLikedImages));
  };

  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon like' />
        </button>
        {lookDatabase.count}
      </div>
    </>
  );
}

export default Like;
