import { useRef, useState, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useXR, Interactive } from '@react-three/xr';
import { Box, Text } from '@react-three/drei';

export const ModelViewer = ({ modelUrl, position, rotation, scale, onError }) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modelRef = useRef();
  const { isPresenting } = useXR();

  useEffect(() => {
    if (!modelUrl) return;

    setLoading(true);
    setError(null);

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        setModel(gltf);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        setError(error);
        setLoading(false);
        onError?.(error);
      }
    );
  }, [modelUrl, onError]);

  useFrame(() => {
    if (modelRef.current && !isPresenting) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  if (loading) {
    return (
      <Box args={[1, 1, 1]} position={position}>
        <meshStandardMaterial color="#6366f1" />
      </Box>
    );
  }

  if (error) {
    return (
      <Text
        position={position}
        color="red"
        fontSize={0.2}
        maxWidth={2}
        textAlign="center"
      >
        Error loading model
      </Text>
    );
  }

  if (!model) return null;

  return (
    <Interactive>
      <primitive
        ref={modelRef}
        object={model.scene}
        position={position}
        rotation={rotation}
        scale={scale}
        dispose={null}
      />
    </Interactive>
  );
}; 