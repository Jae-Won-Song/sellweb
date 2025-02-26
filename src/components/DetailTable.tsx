'use client';
import Button from './Button';
import { usePathname } from 'next/navigation';

interface DetailTableProps {
  title: string;
  date: string;
  content: string;
}

export default function DetailTable({
  title,
  date,
  content,
}: DetailTableProps) {
  const path = usePathname();
  return (
    <div className="w-[1200px] h-screen flex flex-col">
      <div className="h-[120px] px-[20px] border-b border-[#afafaf] bg-[#f4f4f4]">
        <div className="h-[60px] flex justify-start items-center text-[24px] font-bold">
          {title}
        </div>
        <div className="h-[60px] flex justify-start">{date}</div>
      </div>
      <div className="h-[300px]">
        <div className="w-[1200px] h-[500px]">{content}</div>
      </div>
      {path.startsWith('/mypage/ask/') && (
        <div className="h-[200px] p-[20px] border border-b-0 border-[#afafaf]">
          답변자리
        </div>
      )}

      <div className="h-[100px] border-y border-[#afafaf]">
        <div className="h-[50px] flex border-b border-[#afafaf]">
          <div className="w-[200px] flex justify-center items-center border-r border-[#afafaf]">
            이전글
          </div>
          <div className="w-[1000px] flex justify-center items-center">
            이전글이 없습니다
          </div>
        </div>
        <div className="h-[50px] flex">
          <div className="w-[200px] flex  justify-center items-center border-r border-[#afafaf]">
            다음글
          </div>
          <div className="w-[1000px] flex justify-center items-center">
            다음글이 없습니다
          </div>
        </div>
      </div>
      <div className="my-[20px] flex gap-[20px] justify-end">
        {path === '/mypage/ask/detail' ? (
          <Button
            theme="white"
            width={80}
            height={40}
            color="#fff"
            fontColor="#000"
            state="default"
          >
            삭제
          </Button>
        ) : null}
        <Button
          theme="white"
          width={80}
          height={40}
          color="#566270 "
          state="default"
        >
          목록
        </Button>
      </div>
    </div>
  );
}
