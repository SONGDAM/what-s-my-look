import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import authState from '../recoil/authState';

//import firebase from 'firebase/compat/app';
// import { useRecoilValue } from 'recoil';
import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
// import authState from '../recoil/authState';
import '../styles/like.css';

function Like({ imageDummy }) {
  const count = imageDummy.count;
  const imageIndex = imageDummy.id - 1;
  const [isLike, setIsLike] = useState(false); //클릭여
  const authUserEmail = useRecoilValue(authState); //유저정보 가져오기
  const db = getDatabase();

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
  const getUserfromlikes = () => {
    const getLikesReference = ref(db, `database/look/${imageIndex}/likes`);
    onValue(getLikesReference, (snapshot) => {
      //likes 내용물 있을때만 key,user 정보 가져오기
      if (snapshot.exists()) {
        const key = Object.keys(snapshot.val()); //키
        const user = Object.values(snapshot.val()).map((list) => list.user); //유저이메일
        //toggleLike(key, user) //좋아요 클릭 이벤트에 파라미터 넘기기
        console.log(key, user);
        return user;
      }
    });
  };
  // }, []);

  //키값가져오기
  // const getKeyAndvalues = () => {
  //   const dbref = ref(db, `database/look/${imageIndex}/likes`);

  //   onValue(dbref, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       const childData = Object.values(childSnapshot.val());
  //       console.log('childKey', childKey, 'childData', childData);
  //       return childData;
  //     });
  //   });
  // };

  //좋아요 클릭 시
  const toggleLike = () => {
    if (!authUser) {
      alert('로긘해라');
    }

    const test = getUserfromlikes();

    console.log('니뭔데', test);
    if (test === authUser.email) {
      downLike();
    }
    if (test !== authUser.email) {
      upLike();
    }
  };

  const upLike = () => {
    console.log('업');
    //유저추가
    const saveUserReference = ref(db, `database/look/${imageIndex}/likes`);
    push(saveUserReference, {
      user: authUser.email,
    });
    setIsLike(true);

    //카운트+1 저장
    const saveCountPlusReference = ref(db, `database/look/${imageIndex}`);
    update(saveCountPlusReference, {
      count: count + 1,
    });
  };

  const downLike = (key) => {
    console.log('다운');
    //유저제거
    const removeUserReference = ref(
      db,
      `database/look/${imageIndex}/likes/${key}`
    );
    remove(removeUserReference);

    //카운트-1 저장
    const saveCountMinusReference = ref(db, `database/look/${imageIndex}`);
    update(saveCountMinusReference, {
      count: count - 1,
    });
  };
  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon like' />
        </button>
        <span className='like-count'>{count}</span>
      </div>
    </>
  );
}

export default Like;

// import axios from 'axios';
// import unLike from '../assets/icon/empty-heart.png';
// import like from '../assets/icon/full-heart.png';
// import '../styles/like.css';
// import { useState, useEffect, useContext } from 'react';
// import { getUserContext } from '../App';

// function Like({ count, imageName, lno }) {
//   const [isLike, setIsLike] = useState(false); //좋아요 클릭
//   const user = useContext(getUserContext); //user정보
//   const [userId, setUserId] = useState(''); //user의 id

//   //user정보를 map 돌려서 id값 userId에 저장
//   useEffect(() => {
//     setUserId(user.map((list) => list.id));
//   }, [user]);

//   //db에서 좋아요 테이블 가져오기
//   const getLike = async () => {
//     const response = await axios.get('api/get/like');
//     const data = response.data;
//     // console.log('좋아요 테이블', data);

//     //로그인한 유저가 좋아요 했으면 빨간하트로 바꾸기 이거 안됨 (useState가 개별이 아닌 한 덩어리로 움직임 후....)
//     if (data.map((list) => list.member_id === userId)) {
//       setIsLike(true);
//     } else {
//       setIsLike(false);
//     }
//   };

//   useEffect(() => {
//     getLike();
//   }, []);

//   //좋아요 버튼 클릭 시
//   const toggleLike = () => {
//     if (isLike === false) {
//       setIsLike(true);
//       upLike();
//     } else {
//       setIsLike(false);
//       downLike();
//     }
//   };

//   //좋아요 db에 저장
//   const upLike = async () => {
//     await axios
//       .post('/api/post/like', {
//         id: userId,
//         imageName: imageName,
//       })
//       .then((res) => console.log(res.data));
//   };

//   //좋아요 취소 db에 저장
//   const downLike = async () => {
//     await axios
//       .post('/api/post/unLike', {
//         lno: lno,
//       })
//       .then((res) => console.log(res.data));
//   };

//   return (
//     <>
//       <div className='like-container'>
//         <button onClick={toggleLike}>
//           <img src={isLike ? like : unLike} alt='' className='icon like' />
//         </button>
//         <span className='like-count'>
//           {count}/{imageName}/{lno}
//         </span>
//       </div>
//     </>
//   );
// }
// export default Like;
