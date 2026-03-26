import { useState, useCallback } from 'react';

const useClipboard = () => {
  const [message, setMessage] = useState('');

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage('CSS가 클립보드에 복사되었습니다!');
      setTimeout(() => setMessage(''), 2000);
      return true;
    } catch {
      setMessage('복사에 실패했습니다.');
      setTimeout(() => setMessage(''), 2000);
      return false;
    }
  }, []);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    copyToClipboard,
    clearMessage
  };
};

export default useClipboard;