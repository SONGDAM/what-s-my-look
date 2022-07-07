import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useState, useEffect } from 'react';
import { update, ref, push, child, remove } from 'firebase/database';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authState';
import { database } from './firebase';
import _ from 'lodash';

function Like({ images }) {
  const [isLike, setIsLike] = useState(false);
  const [lookDatabase, setLookDatabase] = useState({});
  const [unAuthedUser, setUnAuthedUser] = useState(false);

  const imageIndex = images.id - 1;
  const authUser = useRecoilValue(authState);
  const getCountReference = ref(database, `database/look/${imageIndex}`);

  useEffect(() => {
    if (!authUser) {
      setUnAuthedUser(true);
    }
  }, [authUser]);

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
    if (lookDatabase.likes) {
      //이미지별 좋아요한 유저목록
      const user = Object.values(lookDatabase.likes);
      //로그인 시 로그인 유저랑 같은 사람이 있는지
      if (authUser) {
        if (user.find((item) => item.user === authUser.email)) {
          setIsLike(true);
          return;
        }
      }
    }
    // setIsLike(false);
  }, [authUser, lookDatabase.likes]);

  //좋아요 클릭 시
  const toggleLike = () => {
    if (!authUser) {
      if (!isLike) {
        alert('로그인 시 좋아요한 이미지를 확인하실 수 있습니다.');
      }
    }

    if (!isLike) {
      upLike();
      addLikedImages();
      return;
    }
    downLike();
    deletelikedImages();
  };

  //좋아요
  const upLike = () => {
    setIsLike(true);

    //로그인
    if (authUser) {
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
    }
  };

  //좋아요 취소
  const downLike = () => {
    setIsLike(false);

    if (authUser && lookDatabase.likes) {
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
    const prevLocalLike = JSON.parse(
      localStorage.getItem('likedImages') || '[]'
    );

    //로그인
    if (authUser) {
      localStorage.setItem(
        'likedImages',
        JSON.stringify(_.uniqBy([...prevLocalLike, images], 'id'))
      );
      return;
    }
    //비로그인
    if (unAuthedUser) {
      const prevLikedImages = JSON.parse(
        sessionStorage.getItem('nonLoginLikedImages') || '[]'
      );

      sessionStorage.setItem(
        'nonLoginLikedImages',
        JSON.stringify([...prevLikedImages, images])
      );
    }
  };

  //선택된 이미지 로컬에 제거
  const deletelikedImages = () => {
    //로그인
    if (authUser) {
      const getLikedImages = JSON.parse(localStorage.getItem('likedImages'));
      if (getLikedImages) {
        const deleteLikedImages = getLikedImages.filter(
          (item) => item.id !== images.id
        );

        localStorage.setItem('likedImages', JSON.stringify(deleteLikedImages));
      }
      return;
    }

    //비로그인
    if (unAuthedUser) {
      const getLikedImages = JSON.parse(
        sessionStorage.getItem('nonLoginLikedImages')
      );
      const deleteLikedImages = getLikedImages.filter(
        (item) => item.id !== images.id
      );

      sessionStorage.setItem(
        'nonLoginLikedImages',
        JSON.stringify(deleteLikedImages)
      );
    }
  };

  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon' />
        </button>
        {authUser ? lookDatabase.count : ''}
      </div>
    </>
  );
}

export default Like;
