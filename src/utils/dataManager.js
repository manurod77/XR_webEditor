// Generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Create a sample experience entry
export const createSampleExperience = (type) => {
  const id = generateId();
  return {
    id,
    title: `Sample ${type.toUpperCase()} Experience`,
    description: `This is a sample ${type.toLowerCase()} experience. You can edit this description.`,
    experienceTypes: [type.toLowerCase()],
    modelUrl: 'https://example.com/models/sample.glb',
    thumbnailUrl: 'https://via.placeholder.com/300x180?text=Sample',
    isExternal: false,
    externalUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Initialize sample data
export const initializeSampleData = () => {
  return {
    menu: {
      ar: {
        title: 'Augmented Reality',
        experiences: [
          createSampleExperience('ar'),
          createSampleExperience('ar')
        ]
      },
      mr: {
        title: 'Mixed Reality',
        experiences: [
          createSampleExperience('mr'),
          createSampleExperience('mr')
        ]
      },
      vr: {
        title: 'Virtual Reality',
        experiences: [
          createSampleExperience('vr'),
          createSampleExperience('vr')
        ]
      }
    }
  };
};

// Save data to localStorage
export const saveData = (data) => {
  try {
    localStorage.setItem('webxr-editor-data', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Load data from localStorage
export const loadData = () => {
  try {
    const savedData = localStorage.getItem('webxr-editor-data');
    return savedData ? JSON.parse(savedData) : initializeSampleData();
  } catch (error) {
    console.error('Error loading data:', error);
    return initializeSampleData();
  }
};

// Export data as JSON file
export const exportData = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'webxr-editor-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Import data from JSON file
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
}; 