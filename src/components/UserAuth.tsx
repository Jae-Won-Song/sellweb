import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import SlideBar from './SlideBar';

interface UserAuthProps {
  onClose: () => void;
}

const UserAuth = ({ onClose }: UserAuthProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    // 로그인 탭 변경 시 입력 값 초기화
    if (activeTab !== 0) {
      setUserId('');
      setPassword('');
      setLoginError(null);
    }

    // 아이디 찾기 탭 변경 시 입력 값 초기화
    if (activeTab !== 1) {
      setUserName('');
      setEmail('');
      setFindIDError(null);
      setFoundID(null);
    }

    // 비밀번호 찾기 탭 변경 시 입력 값 초기화
    if (activeTab !== 2) {
      setResetUserId('');
      setResetEmail('');
      setVerificationCode('');
      setIsVerified(false);
      setNewPassword('');
      setConfirmPassword('');
      setResetError(null);
    }
  }, [activeTab]);

  // 로그인
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // 아이디 찾기
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [foundID, setFoundID] = useState<string | null>(null);
  const [findIDError, setFindIDError] = useState<string | null>(null);

  // 비밀번호 찾기
  const [resetUserId, setResetUserId] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    setLoginError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message);
        return;
      }

      sessionStorage.setItem('token', data.token);
      alert('로그인 성공!');
      onClose();
    } catch {
      setLoginError('서버 오류가 발생했습니다.');
    }
  };

  const handleFindID = async () => {
    setFindIDError(null);
    setFoundID(null);

    try {
      const response = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFindIDError(data.message);
        return;
      }

      setFoundID(data.userId);
    } catch {
      setFindIDError('서버 오류가 발생했습니다.');
    }
  };

  const handleFindPassword = async () => {
    setResetError(null);
    try {
      const response = await fetch('/api/auth/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: resetUserId, email: resetEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResetError(data.message);
        return;
      }

      alert('이메일로 인증번호가 발송되었습니다.');
    } catch {
      setResetError('서버 오류가 발생했습니다.');
    }
  };

  const handleVerifyCode = async () => {
    setResetError(null);
    try {
      const response = await fetch('/api/auth/find-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: resetUserId,
          email: resetEmail,
          verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResetError(data.message);
        return;
      }

      alert('인증 성공! 새 비밀번호를 설정하세요.');
      setIsVerified(true);
    } catch {
      setResetError('서버 오류가 발생했습니다.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setResetError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: resetUserId,
          email: resetEmail,
          newPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setResetError(data.message);
        return;
      }

      alert('비밀번호가 성공적으로 변경되었습니다.');
      setActiveTab(0);
      setIsVerified(false);
    } catch {
      setResetError('서버 오류가 발생했습니다.');
    }
  };

  const loginForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold mb-2">
        <span className="text-lightPurple">아이디</span>와
        <span className="text-lightPurple">비밀번호</span>를 입력해주세요.
      </h2>
      <Input
        placeholder="아이디 입력"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        width={360}
        height={50}
      />
      <div className="flex justify-center items-center gap-5">
        <Input
          placeholder="비밀번호 입력"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width={240}
          height={50}
        />
        <Button theme="white" onClick={handleLogin} width={100} height={50}>
          로그인
        </Button>
      </div>
      {loginError && <p className=" text-red-500">{loginError}</p>}
    </div>
  );

  const findIDForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold mb-2">
        이름과 이메일을 입력하세요.
      </h2>
      <Input
        placeholder="이름 입력"
        width={360}
        height={50}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        placeholder="이메일 입력"
        width={360}
        height={50}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {findIDError && <p className="text-red-500">{findIDError}</p>}
      {foundID && <p className="text-green-500">아이디: {foundID}</p>}
      <Button theme="white" onClick={handleFindID} width={360} height={50}>
        아이디 찾기
      </Button>
    </div>
  );

  const findPWForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold mb-2">
        아이디와 이메일을 입력하세요.
      </h2>
      <Input
        placeholder="아이디 입력"
        width={360}
        height={50}
        value={resetUserId}
        onChange={(e) => setResetUserId(e.target.value)}
      />
      <div className="flex justify-center items-center gap-5">
        <Input
          placeholder="이메일 입력"
          width={240}
          height={50}
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <Button
          theme="white"
          onClick={handleFindPassword}
          width={100}
          height={50}
        >
          인증번호 받기
        </Button>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Input
          placeholder="인증번호 입력"
          width={240}
          height={50}
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <Button
          theme="white"
          onClick={handleVerifyCode}
          width={100}
          height={50}
        >
          인증 확인
        </Button>
      </div>
      {resetError && <p className="text-red-500">{resetError}</p>}
    </div>
  );
  const resetPasswordForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold mb-2">새 비밀번호를 입력하세요.</h2>
      <Input
        placeholder="새 비밀번호 입력"
        type="password"
        width={360}
        height={50}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        placeholder="새 비밀번호 재입력"
        type="password"
        width={360}
        height={50}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        theme="white"
        width={360}
        height={50}
        onClick={handleChangePassword}
      >
        비밀번호 변경
      </Button>
      {resetError && <p className="text-red-500">{resetError}</p>}
    </div>
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-bold text-center text-3xl mt-8">SellWeb</h1>
        <SlideBar
          slideWidth={120}
          items={['로그인', '계정 찾기', '비밀번호 찾기']}
          onTabChange={setActiveTab}
          activeIndex={activeTab}
        />
        <div className="mt-6">
          {activeTab === 0
            ? loginForm
            : activeTab === 1
              ? findIDForm
              : isVerified
                ? resetPasswordForm
                : findPWForm}
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
