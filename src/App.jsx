import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR, Controllers, Hands } from '@react-three/xr';
import { 
  Code, Eye, Save, Plus, Move, Trash2, X, 
  Download, Upload, Globe, Layout, Settings, 
  CheckCircle, Edit 
} from 'lucide-react';
import { WebXRProvider } from './components/webxr/WebXRProvider';
import { ModelViewer } from './components/webxr/ModelViewer';

// Component for creating icons
const createIcon = (name, size = 16, className = "") => {
  const IconComponent = {
    code: Code,
    eye: Eye,
    save: Save,
    plus: Plus,
    move: Move,
    'trash-2': Trash2,
    x: X,
    download: Download,
    upload: Upload,
    globe: Globe,
    layout: Layout,
    settings: Settings,
    'check-circle': CheckCircle,
    edit: Edit
  }[name];

  return IconComponent ? (
    <IconComponent 
      size={size} 
      className={className}
    />
  ) : null;
};

// Main component
const WebXRContentEditor = () => {
  // Initial data structure
  const initialData = {
    menu: {
      ar: {
        title: "Realidad Aumentada",
        experiences: []
      },
      mr: {
        title: "Realidad Mixta",
        experiences: []
      },
      vr: {
        title: "Realidad Virtual",
        experiences: []
      }
    }
  };

  // Create sample entry
  const createSampleEntry = (type) => ({
    id: `${type}-${Date.now()}`,
    title: `Nueva Experiencia ${type.toUpperCase()}`,
    description: "Ingresa una descripción para esta experiencia",
    thumbnailUrl: "",
    modelUrl: "",
    externalUrl: "",
    isExternal: false,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    experienceTypes: [type]
  });

  // States
  const [data, setData] = useState(initialData);
  const [currentTab, setCurrentTab] = useState('ar');
  const [editingExperience, setEditingExperience] = useState(null);
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [jsonError, setJsonError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [generatedCodeVisible, setGeneratedCodeVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatorOptions, setGeneratorOptions] = useState({
    title: 'Mi Aplicación WebXR',
    description: 'Aplicación WebXR generada con WebXR Content Editor',
    primaryColor: '#6366f1',
    language: 'es',
    menuStyle: 'grid',
    includeLoadingScreen: true,
    generateFullProject: true
  });

  // Drag and drop states
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [dragOverItemId, setDragOverItemId] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('webxrEditorData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
      setSaveStatus('Error al cargar datos guardados');
    }
  }, []);

  // Drag and drop handlers
  const handleDragStart = (e, id) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (id !== draggedItemId) {
      setDragOverItemId(id);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    if (draggedItemId === null || dragOverItemId === null || draggedItemId === dragOverItemId) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }
    
    const experiences = [...data.menu[currentTab].experiences];
    const draggedItemIndex = experiences.findIndex(exp => exp.id === draggedItemId);
    const dragOverItemIndex = experiences.findIndex(exp => exp.id === dragOverItemId);
    
    if (draggedItemIndex === -1 || dragOverItemIndex === -1) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }
    
    const [draggedItem] = experiences.splice(draggedItemIndex, 1);
    experiences.splice(dragOverItemIndex, 0, draggedItem);
    
    setData({
      ...data,
      menu: {
        ...data.menu,
        [currentTab]: {
          ...data.menu[currentTab],
          experiences
        }
      }
    });
    
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  // Experience management functions
  const addExperience = () => {
    const newExperience = createSampleEntry(currentTab);
    setData({
      ...data,
      menu: {
        ...data.menu,
        [currentTab]: {
          ...data.menu[currentTab],
          experiences: [...data.menu[currentTab].experiences, newExperience]
        }
      }
    });
    setEditingExperience(newExperience);
  };

  const deleteExperience = (id) => {
    const newExperiences = data.menu[currentTab].experiences.filter(exp => exp.id !== id);
    setData({
      ...data,
      menu: {
        ...data.menu,
        [currentTab]: {
          ...data.menu[currentTab],
          experiences: newExperiences
        }
      }
    });
    
    if (editingExperience && editingExperience.id === id) {
      setEditingExperience(null);
    }
  };

  const handleExperienceChange = (field, value) => {
    if (!editingExperience) return;
    
    let updatedValue = value;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updatedValue = {
        ...editingExperience[parent],
        [child]: parseFloat(value) || 0
      };
      field = parent;
    }
    
    const updatedExperience = {
      ...editingExperience,
      [field]: updatedValue
    };
    
    setEditingExperience(updatedExperience);
    
    const experiences = data.menu[currentTab].experiences.map(exp => 
      exp.id === updatedExperience.id ? updatedExperience : exp
    );
    
    setData({
      ...data,
      menu: {
        ...data.menu,
        [currentTab]: {
          ...data.menu[currentTab],
          experiences
        }
      }
    });
  };

  const toggleExperienceType = (type) => {
    if (!editingExperience) return;
    
    let types = [...editingExperience.experienceTypes];
    
    if (types.includes(type)) {
      if (types.length > 1) {
        types = types.filter(t => t !== type);
      }
    } else {
      types.push(type);
    }
    
    handleExperienceChange('experienceTypes', types);
  };

  // Data persistence functions
  const saveData = () => {
    try {
      const dataString = JSON.stringify(data);
      if (dataString.length > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Data size exceeds localStorage limit');
      }
      localStorage.setItem('webxrEditorData', dataString);
      setSaveStatus('¡Guardado correctamente!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('Error al guardar los datos');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const exportJson = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.download = 'webxr-content.json';
    link.href = url;
    link.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const uploadedData = JSON.parse(event.target.result);
        setData(uploadedData);
        setSaveStatus('Datos cargados correctamente');
      } catch (error) {
        console.error('Error parsing uploaded file:', error);
        setSaveStatus('Error al cargar el archivo');
      }
    };
    reader.onerror = () => {
      setSaveStatus('Error al leer el archivo');
    };
    reader.readAsText(file);
  };

  // Color validation
  const validateColor = (color) => {
    const isValid = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    return isValid ? color : '#6366f1';
  };

  // Generate WebXR app
  const generateWebXRApp = (data, options) => {
    try {
      const template = `
import { Canvas } from '@react-three/fiber';
import { ARButton, XR, Controllers, Hands } from '@react-three/xr';
import { WebXRProvider } from './components/webxr/WebXRProvider';
import { ModelViewer } from './components/webxr/ModelViewer';

const App = () => {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <WebXRProvider>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {data.menu[currentTab].experiences.map((exp) => (
              <ModelViewer
                key={exp.id}
                modelUrl={exp.modelUrl}
                position={[exp.position.x, exp.position.y, exp.position.z]}
                rotation={[exp.rotation.x, exp.rotation.y, exp.rotation.z]}
                scale={[exp.scale.x, exp.scale.y, exp.scale.z]}
              />
            ))}
            <Controllers />
            <Hands />
          </WebXRProvider>
        </XR>
      </Canvas>
    </>
  );
};

export default App;
      `;
      setGeneratedCode(template);
      setGeneratedCodeVisible(true);
    } catch (error) {
      console.error('Error generating code:', error);
      setSaveStatus('Error al generar el código');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            WebXR Content Editor
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Editor UI */}
        {!previewMode ? (
          <div className="bg-white shadow rounded-lg p-6">
            {/* Experience Type Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              {Object.keys(data.menu).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  className={`py-2 px-4 font-medium ${
                    currentTab === tab
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {data.menu[tab].title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Experience List */}
              <div className="md:col-span-5 bg-white p-4 rounded-lg shadow">
                {/* ... Rest of the JSX ... */}
              </div>

              {/* Experience Editor */}
              <div className="md:col-span-7 bg-white p-4 rounded-lg shadow">
                {/* ... Rest of the JSX ... */}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen">
            <Canvas>
              <XR>
                <WebXRProvider>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  {data.menu[currentTab].experiences.map((exp) => (
                    <ModelViewer
                      key={exp.id}
                      modelUrl={exp.modelUrl}
                      position={[exp.position.x, exp.position.y, exp.position.z]}
                      rotation={[exp.rotation.x, exp.rotation.y, exp.rotation.z]}
                      scale={[exp.scale.x, exp.scale.y, exp.scale.z]}
                    />
                  ))}
                  <Controllers />
                  <Hands />
                </WebXRProvider>
              </XR>
            </Canvas>
          </div>
        )}
      </main>
    </div>
  );
};

export default WebXRContentEditor; 