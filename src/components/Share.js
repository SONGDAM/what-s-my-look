/* Global Kakao */

import share from '../assets/icon/share.png';

function Share() {
  const shareByKakaoAPI = () => {
    Kakao.Link.sendCustom({
      templateId: `${78638}`,
      templateArgs: {
        title: '제목 영역입니다.',
        description: '설명 영역입니다.',
      },
    });
  };

  return (
    <>
      <div onClick={shareByKakaoAPI}>
        <img src={share} alt='' className='icon' />
      </div>
    </>
  );
}
export default Share;
