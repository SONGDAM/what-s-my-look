import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useState, useEffect } from 'react';
import {
  getDatabase,
  update,
  ref,
  onValue,
  push,
  remove,
} from 'firebase/database';
import { useRecoilValue } from 'recoil';
import authState from '../recoil/authState';

function Like({ imageDummy }) {
  const imageIndex = imageDummy.id - 1;
  const count = imageDummy.count;
  const [isLike, setisLike] = useState(false);
  const [viewNumber, setViewNumber] = useState([]);
  const db = getDatabase();
  const authUser = useRecoilValue(authState);

  //페이지 로딩 시 유저가 좋아요 했으면 빨간 하트
  useEffect(() => {
    const getLikesReference = ref(db, `database/look/${imageIndex}/likes`);
    onValue(getLikesReference, (snapshot) => {
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
  }, [authUser, db, imageIndex]);

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
    const getLikesReference = ref(db, `database/look/${imageIndex}/likes`);
    onValue(getLikesReference, (snapshot) => {
      if (snapshot.exists()) {
        const key = Object.keys(snapshot.val()); //키
        const user = Object.values(snapshot.val()).map((list) => list.user); //유저이메일
        console.log(key, user);

        const removeUserReference = ref(
          db,
          `database/look/${imageIndex}/likes/${key}`
        );
        remove(removeUserReference);
      }
    });

    //카운트-1
    const saveCountMinusReference = ref(db, `database/look/${imageIndex}`);
    update(saveCountMinusReference, {
      count: count - 1,
    });
  };

  //좋아요
  const upLike = () => {
    console.log('업');
    //유저추가
    const saveUserReference = ref(db, `database/look/${imageIndex}/likes`);
    push(saveUserReference, {
      user: authUser.email,
    });

    //카운트+1
    const saveCountPlusReference = ref(db, `database/look/${imageIndex}`);
    update(saveCountPlusReference, {
      count: count + 1,
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

  // console.log('viewNumber', Object.keys(viewNumber.likes).length);

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

//순서도
// 1.좋아요 했을때 비로그인시 로그인 알림창

// 좋아요 클릭시

// 좋아요 될 때
// -ref(database/look/imageNum/likes) 에서 로그인 유저 없으면
// -ref(database/look/imageNum/likes) push (유저정보)
// -ref(database/look/imageNum) update (count +1)

// 좋아요 취소 될 때
// -ref(database/look/imageNum/likes) 에서 로그인 유저 있으면
//  -ref(database/look/imageNum/키값) remove (유저정보)
//  -ref(database/look/imageNum) update (count -1)

//likes의 key,유저목록 가져오기
// useEffect(() => {

// const count = imageDummy.count;
// const imageIndex = imageDummy.id - 1;
// const [isLike, setIsLike] = useState(false); //클릭여
// const [test, setTest] = useState(null);
// const authUser = useRecoilValue(authState); //유저정보 가져오기
// const db = getDatabase();

// useEffect(() => {
//   const getLikesReference = ref(db, `database/look/${imageIndex}/likes`);
//   onValue(getLikesReference, (snapshot) => {
//     //likes 내용물 있을때만 key,user 정보 가져오기
//     if (snapshot.exists()) {
//       const key = Object.keys(snapshot.val()); //키
//       const user = Object.values(snapshot.val()).map((list) => list.user); //유저이메일
//     }
//   });
//   console.log(test);
// }, [db, imageIndex, test]);

// const upLike = () => {
//   console.log('업');
//   //유저추가
//   const saveUserReference = ref(db, `database/look/${imageIndex}/likes`);
//   push(saveUserReference, {
//     user: authUser.email,
//   });
//   setIsLike(true);

//   //카운트+1 저장
//   const saveCountPlusReference = ref(db, `database/look/${imageIndex}`);
//   update(saveCountPlusReference, {
//     count: count + 1,
//   });
// };

// const downLike = (key) => {
//   console.log('다운');
//   //유저제거
//   const removeUserReference = ref(
//     db,
//     `database/look/${imageIndex}/likes/${key}`
//   );
//   remove(removeUserReference);

//   //카운트-1 저장
//   const saveCountMinusReference = ref(db, `database/look/${imageIndex}`);
//   update(saveCountMinusReference, {
//     count: count - 1,
//   });
// };

// console.log(upLike(), downLike());
// return (
//   <>
//     <div className='like-container'>
//       <button>
//         <img src={isLike ? like : unLike} alt='' className='icon like' />
//       </button>
//       <span className='like-count'>{count}</span>
//     </div>
//   </>
// );
