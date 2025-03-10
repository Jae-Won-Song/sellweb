import Image from 'next/image';
import iconChatWhite from '../../public/svgs/icon-chat(D).svg';

type ChatBtnStyleProps = {
  backgroundColor: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const ChatBtn = ({ backgroundColor, onClick }: ChatBtnStyleProps) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor }}
      className="fixed top-[600px] right-[50px] w-[70px] h-[70px] flex justify-center items-center rounded-full text=[32px] cursor-pointer"
    >
      <Image src={iconChatWhite} alt="채팅 버튼" />
    </div>
  );
};

export default ChatBtn;
