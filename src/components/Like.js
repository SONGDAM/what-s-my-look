import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useState, useEffect } from 'react';
import { update, ref, onValue, push, remove } from 'firebase/database';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authState';
import { database } from './firebase';

function Like({ imageDummy }) {
  const [isLike, setisLike] = useState(false);
  const [viewNumber, setViewNumber] = useState([]);

  const imageIndex = imageDummy.id - 1;
  const authUser = useRecoilValue(authState);
  const getLikesUserReference = ref(
    database,
    `database/look/${imageIndex}/likes`
  );
  const getCountReference = ref(database, `database/look/${imageIndex}`);

  //페이지 로딩 시 유저가 좋아요 했으면 빨간 하트
  useEffect(() => {
    onValue(getLikesUserReference, (snapshot) => {
      if (snapshot.exists()) {
        const user = Object.values(snapshot.val()); //유저이메일
        //로그인했을 때 이미지별 좋아요 눌린 유저중에 로그인 유저랑 같은 사람이 있는지
        if (authUser) {
          if (user.map((item) => item.user === authUser.email)) {
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
    setisLike((prev) => !prev);

    if (!isLike) {
      upLike();
      return;
    }
    downLike();
  };

  //좋아요 취소
  const downLike = () => {
    console.log('다운');

    //유저제거
    onValue(getLikesUserReference, (snapshot) => {
      if (snapshot.exists()) {
        const key = Object.keys(snapshot.val()); //키
        const removeUserReference = ref(
          database,
          `database/look/${imageIndex}/likes/${key}`
        );
        remove(removeUserReference);
      }
    });

    //카운트-1
    update(getCountReference, {
      count: viewNumber.count - 1,
    });
  };

  //좋아요
  const upLike = () => {
    console.log('업');
    //유저추가
    push(getLikesUserReference, {
      user: authUser.email,
    });

    //카운트+1
    update(getCountReference, {
      count: viewNumber.count + 1,
    });
  };

  useEffect(() => {
    const res = async () => {
      fetch(
        `https://what-s-my-look-default-rtdb.firebaseio.com/database/look/${imageIndex}.json`
      )
        .then((response) => response.json())
        .then((data) => setViewNumber(data));
    };
    res();
  }, [imageIndex, isLike]);

  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon like' />
        </button>
        {viewNumber.count}
      </div>
    </>
  );
}

export default Like;
