import AdminAsk from '@/components/AdminAsk';
import AdminSection from '@/components/AdminSection';
import AdminTemp from '@/components/AdminTemp';
import AdminChart from '../../components/AdminChart';
import AdminNoticeAd from '@/components/AdminNoticeAd';

export default function Page() {
  return (
    <div className="h-full p-[20px] flex flex-col">
      <div className="w-full h-[400px] flex">
        <AdminSection>
          <AdminNoticeAd />
        </AdminSection>
        <AdminSection title="대시보드">
          <AdminChart />
        </AdminSection>
      </div>
      <div className="w-full h-[400px] flex">
        <AdminSection title="문의내역">
          <AdminAsk />
        </AdminSection>
        <AdminSection title="템플릿">
          <AdminTemp />
        </AdminSection>
      </div>
    </div>
  );
}
