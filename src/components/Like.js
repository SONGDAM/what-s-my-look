import { getDatabase, onValue, push, ref, update } from 'firebase/database';
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
  const imageIndex = imageDummy.id;
  const [isLike, setIsLike] = useState(false); //클릭여부
  const authUser = useRecoilValue(authState); //유저정보 가져오기
  const currentEmail = authUser.email;
  const db = getDatabase();

  //순서도
  // 1.좋아요 했을때 비로그인시 로그인 알림창

  // 좋아요 클릭시

  // 좋아요 될 때
  // -ref(database/look/imageNum/likes) 에서 로그인 유저 있는지 찾고 없으면
  // -ref(database/look/imageNum/likes) push (유저정보)
  // -ref(database/look/imageNum) update (count +1)

  // 좋아요 취소 될 때
  // -ref(database/look/imageNum/likes) 에서 로그인 유저 있는지 찾고 있으면
  //  -ref(database/look/imageNum) remove? (유저정보)
  //  -ref(database/look/imageNum) update (count -1)

  //좋아요 db 저장
  // const upLike = () => {
  // //post user (email, name, profile)
  // const userData = authUser;
  // //get key for new like
  // const newLikeKey = initializeApp
  //   .getDatabase()
  //   .ref()
  //   .child(`database/look/${imageIndex}/likes`)
  //   .push().key;
  // const updates = {};
  // updates[`/database/look/${imageIndex}/likes` + newLikeKey] = userData;
  // return initializeApp.getDatabase().ref().update(updates);
  // const newLikeKey = firebase
  //   .getDatabase()
  //   .ref()
  //   .child(`database/look/${imageIndex}/likes`)
  //   .push().key;
  // const saveUserIdReference = ref(
  //   db,
  //   `database/look/${imageIndex}/likes/${newLikeKey}`
  // );
  // update(saveUserIdReference, {
  //   user: authUser,
  // });
  // const saveCountReference = ref(db, `database/look/${imageIndex}/`);
  // update(saveCountReference, {
  //   // count: setCount((count) => count + 1),
  //   // count: count + 1,
  // });

  // const saveUserReference = ref(db, `database/look/${imageIndex}/likes`);
  // push(saveUserReference, {
  //   currentEmail,
  // });
  // };

  //좋아요 취소 db 저장
  // const downLike = (userId) =>{
  //   const deleteUSerIdReference = ref(db,`database/look/${imgNum}/likes/`);
  //   update(deleteUSerIdReference,{
  //     if()
  //   })
  // }

  // const reference = ref(db, `database/look/${imgNum}`);
  // onValue(reference, (snapshot) => {
  //const data = snapshot.val();
  //console.log('data', data);
  //setCount(data);
  //  });

  // useEffect(() => {
  //   const getCount = () => {
  //     fetch(
  //       'https://what-s-my-look-default-rtdb.firebaseio.com/database/look.json'
  //     )
  //       .then((res) => res.json())
  //       .then((data) => setUserData(data));
  //   };
  //   getCount();
  // }, []);

  //카운트 개수 가져오기
  // useEffect(() => {

  // }, [count]);

  //좋아요 버튼 클릭시 uplike/downLike 실행
  // const toggleLike = () => {
  //   if (!authUser) {
  //     alert('로긘해줘');
  //   }

  //   // if (!isLike) {
  //   //   setIsLike(true);
  //   //   upLike();
  //   // }

  //   //좋아요X & 로그인O  (좋아요)
  //   if (!isLike && authUser) {
  //     setIsLike(true);
  //     upLike();
  //   }

  //   // downLike(userId);
  // };
  console.log(setIsLike);
  //likes 가져오기
  const getUserfromlikes = () => {
    const getLikesReference = ref(db, `database/look/${imageIndex - 1}/likes`);
    onValue(getLikesReference, (snapshot) => {
      const data = snapshot.val();
      console.log('likes나와야함', data);
      return data;
    });
  };

  //유저가 있는데 likes자체가 없거나 이미지 likes 배열중에 유저이메일이 없을때 =>upLike
  const toggleLike = () => {
    const isUser = getUserfromlikes();
    if (!isUser && authUser) {
      upLike();
    }
  };

  const upLike = () => {
    //유저저장 왜 2개씩 들어가냐고
    const saveUserReference = ref(db, `database/look/${imageIndex - 1}/likes`);
    push(saveUserReference, {
      currentEmail,
    });
    setIsLike(true);
    console.log('업');

    //카운트 저장
    const saveCountReference = ref(db, `database/look/${imageIndex - 1}`);
    update(saveCountReference, {
      count: count + 1,
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
