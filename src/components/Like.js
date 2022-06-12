import { getDatabase, ref, update, push } from 'firebase/database';
import { useState, useEffect } from 'react';
import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
import '../styles/like.css';

function Like({ imgNum }) {
  const [isLike, setIsLike] = useState(false); //클릭여부
  // const [count, setCount] = useState({});
  const [userData, setUserData] = useState([]);
  const userId = 'hnk3177@google.com';
  // const userId = null;
  const db = getDatabase();

  //좋아요 db 저장
  const upLike = (userId) => {
    const saveUserIdReference = ref(db, `database/look/${imgNum}/likes/`);
    push(saveUserIdReference, {
      0: userId,
    });

    const saveCountReference = ref(db, `database/look/${imgNum}/`);
    update(saveCountReference, {
      // count: setCount((count) => count + 1),
      // count: count + 1,
    });
  };

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

  useEffect(() => {
    const getCount = () => {
      fetch(
        'https://what-s-my-look-default-rtdb.firebaseio.com/database/look.json'
      )
        .then((res) => res.json())
        .then((data) => setUserData(data));
    };
    getCount();
  }, []);

  //카운트 개수 가져오기
  // useEffect(() => {

  // }, [count]);

  //좋아요 버튼 클릭시 uplike/downLike 실행
  const toggleLike = () => {
    if (!userId) {
      alert('로긘해줘');
    }

    if (!isLike) {
      setIsLike(true);
      upLike(userId);
    }

    // downLike(userId);
  };
  // console.log(
  //   '나와라..',
  //   userData.map((list) => list.count)
  // );
  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon like' />
        </button>
        {userData &&
          userData.map((data) => (
            <div key={data.id}>
              <p>{data.count}</p>
              <p>{data.name}</p>
            </div>
          ))}
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
