import axios from 'axios';
import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
// import axios from 'axios';
import '../styles/like.css';
import { useState, useEffect } from 'react';

function Like({ count, imageName, lno }) {
  //임시 로그인 아이디 변수
  const userId = 'hnk@dd';
  //좋아요클릭
  const [isLike, setIsLike] = useState(false);
  const [likedByUserArray, setLikedByUserArray] = useState();

  //db에서 좋아요 테이블 가져오기
  const getLike = async () => {
    const response = await axios.get('api/get/like');
    const data = response.data;
    console.log('좋아요 테이블', data);

    //로그인한 유저가 좋아요 했으면 빨간하트로 바꾸기
    //   if (data.filter((list) => list.member_id === userId)) {
    //     setIsLike(true);
    //   } else {
    //     setIsLike(false);
    //   }
    //여기지금 수정중
    const likedFilter = data.filter((list) => list.member_id === userId);
    setLikedByUserArray(likedFilter);

    likedByUserArray ? setIsLike(true) : setIsLike(false);
  };

  console.log('ff', likedByUserArray);

  useEffect(() => {
    getLike();
  }, []);

  //좋아요 버튼 클릭 시
  const toggleLike = () => {
    if (isLike === false) {
      setIsLike(true);
      upLike();
    } else {
      setIsLike(false);
      downLike();
    }
  };

  //좋아요 db에 저장
  const upLike = async () => {
    await axios
      .post('/api/post/like', {
        id: userId,
        imageName: imageName,
      })
      .then((res) => console.log(res.data));
  };

  //좋아요 취소 db에 저장
  const downLike = async () => {
    await axios
      .post('/api/post/unLike', {
        lno: lno,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon like' />
        </button>
        <span className='like-count'>
          {count}/{imageName}/{lno}
        </span>
      </div>
    </>
  );
}
export default Like;
