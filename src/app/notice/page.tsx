import Table from '@/components/Table';
import TitleBox from '@/components/TitleBox';

export default function Notice() {
  const rows = [
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
    ['1', '공지사항입니다', '2024.09.01'],
  ];

  return (
    <div className="h-full">
      <TitleBox title="공지사항" />
      <Table
        headers={[
          { label: '번호', width: '100px' },
          { label: '제목', width: '900px' },
          { label: '등록 날짜', width: '200px' },
        ]}
        rows={rows}
        link="/notice/detail"
      />
    </div>
  );
}
