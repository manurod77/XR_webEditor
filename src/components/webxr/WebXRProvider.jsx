import { createContext, useContext, useState, useEffect } from 'react';
import { useXR, XRButton, Controllers, Hands, useController } from '@react-three/xr';
import { useThree } from '@react-three/fiber';

const WebXRContext = createContext();

export const useWebXR = () => {
  const context = useContext(WebXRContext);
  if (!context) {
    throw new Error('useWebXR must be used within a WebXRProvider');
  }
  return context;
};

export const WebXRProvider = ({ children }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState(null);
  const { gl } = useThree();
  const { isPresenting, player } = useXR();

  useEffect(() => {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar')
        .then((supported) => {
          setIsSupported(supported);
        })
        .catch((err) => {
          setError(err);
          console.error('Error checking XR support:', err);
        });
    } else {
      setError(new Error('WebXR not supported in this browser'));
    }
  }, []);

  const value = {
    isSupported,
    error,
    isPresenting,
    player
  };

  return (
    <WebXRContext.Provider value={value}>
      {children}
      {isSupported && (
        <XRButton
          mode="AR"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      )}
      <Controllers />
      <Hands />
    </WebXRContext.Provider>
  );
}; 