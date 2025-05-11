// Color validation
export const validateColor = (color) => {
  const isValid = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  return isValid ? color : '#6366f1';
};

// Generate WebXR App
export const generateWebXRApp = (data, options) => {
  // Get texts based on language
  const texts = options.language === 'es' ? {
    loading: 'Cargando...',
    start: 'Iniciar',
    back: 'Volver',
    ar: 'Realidad Aumentada',
    mr: 'Realidad Mixta',
    vr: 'Realidad Virtual',
    enterAR: 'Entrar en AR',
    enterVR: 'Entrar en VR',
    external: 'Abrir experiencia externa',
    arSupport: 'Tu dispositivo no soporta AR',
    vrSupport: 'Tu dispositivo no soporta VR',
    loading3d: 'Cargando modelo 3D...',
    noExperiences: 'No hay experiencias disponibles en esta categoría'
  } : {
    loading: 'Loading...',
    start: 'Start',
    back: 'Back',
    ar: 'Augmented Reality',
    mr: 'Mixed Reality',
    vr: 'Virtual Reality',
    enterAR: 'Enter AR',
    enterVR: 'Enter VR',
    external: 'Open external experience',
    arSupport: 'Your device does not support AR',
    vrSupport: 'Your device does not support VR',
    loading3d: 'Loading 3D model...',
    noExperiences: 'No experiences available in this category'
  };

  // Generate HTML code
  return `<!DOCTYPE html>
<html lang="${options.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.title}</title>
  <style>
    :root {
      --primary-color: ${validateColor(options.primaryColor)};
      --primary-dark: ${validateColor(options.primaryColor)}dd;
      --primary-light: ${validateColor(options.primaryColor)}33;
      --text-light: #ffffff;
      --text-dark: #333333;
      --background-light: #f8f9fa;
      --background-dark: #212529;
      --border-radius: 8px;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    body {
      background-color: var(--background-light);
      color: var(--text-dark);
      height: 100vh;
      overflow: hidden;
    }
    
    header {
      background-color: var(--primary-color);
      color: var(--text-light);
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
    
    /* Tabs navigation */
    .tabs {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-bottom: 1rem;
    }
    
    .tab {
      padding: 0.75rem 1rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
    }
    
    .tab.active {
      border-bottom: 2px solid var(--primary-color);
      color: var(--primary-color);
      font-weight: 500;
    }
    
    /* Grid view */
    .grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }
    
    /* List view */
    .list-view {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .list-view .card {
      display: flex;
      align-items: center;
    }
    
    .list-view .card-img {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      margin-right: 1rem;
    }
    
    /* Carousel view */
    .carousel-view {
      display: flex;
      overflow-x: auto;
      padding: 0.5rem 0;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    
    .carousel-view .card {
      flex: 0 0 280px;
      margin-right: 1rem;
      scroll-snap-align: start;
    }
    
    /* Card component */
    .card {
      background-color: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .card-img {
      width: 100%;
      height: 180px;
      background-color: #f0f0f0;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    
    .card-content {
      padding: 1rem;
    }
    
    .card-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .card-desc {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .tag {
      background-color: var(--primary-light);
      color: var(--primary-color);
      padding: 0.25rem 0.5rem;
      border-radius: 100px;
      font-size: 0.75rem;
      display: inline-flex;
      align-items: center;
    }
    
    .tag-external {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    .card-cta {
      text-align: center;
    }
    
    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      border: none;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
    
    .btn-outline {
      background-color: transparent;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    
    .btn-outline:hover {
      background-color: var(--primary-light);
    }
    
    .btn-block {
      display: block;
      width: 100%;
    }
    
    /* External badge */
    .external-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #1976d2;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
    
    /* Loading screen */
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--background-light);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      transition: opacity 0.5s ease;
    }
    
    .loader {
      width: 60px;
      height: 60px;
      border: 5px solid var(--primary-light);
      border-top: 5px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* WebXR view */
    .webxr-view {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: black;
      z-index: 900;
      display: none;
    }
    
    .webxr-canvas {
      width: 100%;
      height: 100%;
    }
    
    .webxr-buttons {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    
    /* Media queries */
    @media (max-width: 768px) {
      .grid-view {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      }
    }
    
    @media (max-width: 480px) {
      .grid-view {
        grid-template-columns: 1fr;
      }
      
      .carousel-view .card {
        flex: 0 0 240px;
      }
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.157.0/examples/js/loaders/GLTFLoader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.157.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <header>
    <h1>${options.title}</h1>
  </header>
  
  <div class="container">
    <div class="tabs">
      ${Object.keys(data.menu).map(key => `<div class="tab" data-tab="${key}">${data.menu[key].title}</div>`).join('')}
    </div>
    
    <div class="content">
      ${Object.keys(data.menu).map(key => `
        <div class="tab-content" data-content="${key}">
          <div class="${options.menuStyle === 'grid' ? 'grid-view' : options.menuStyle === 'list' ? 'list-view' : 'carousel-view'}">
            ${data.menu[key].experiences.length ? data.menu[key].experiences.map(exp => `
              <div class="card" data-experience-id="${exp.id}">
                <div class="card-img" style="background-image: url('${exp.thumbnailUrl || 'https://via.placeholder.com/300x180?text=No+Image'}')">
                  ${exp.isExternal ? '<div class="external-badge"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>' : ''}
                </div>
                <div class="card-content">
                  <h3 class="card-title">${exp.title}</h3>
                  <p class="card-desc">${exp.description}</p>
                  <div class="card-tags">
                    ${exp.experienceTypes.map(type => `<span class="tag">${type.toUpperCase()}</span>`).join('')}
                    ${exp.isExternal ? `<span class="tag tag-external">${texts.external}</span>` : ''}
                  </div>
                  <div class="card-cta">
                    ${exp.isExternal ?
                      `<a href="${exp.externalUrl}" target="_blank" class="btn btn-primary btn-block">${texts.external}</a>` :
                      exp.experienceTypes.includes('ar') ?
                        `<button class="btn btn-primary btn-block start-ar" data-id="${exp.id}">${texts.enterAR}</button>` :
                        exp.experienceTypes.includes('vr') ?
                          `<button class="btn btn-primary btn-block start-vr" data-id="${exp.id}">${texts.enterVR}</button>` :
                          `<button class="btn btn-primary btn-block view-3d" data-id="${exp.id}">${texts.start}</button>`
                    }
                  </div>
                </div>
              </div>
            `).join('') : `<div class="empty-state">${texts.noExperiences}</div>`}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <!-- WebXR View -->
  <div class="webxr-view">
    <canvas class="webxr-canvas"></canvas>
    <div class="webxr-buttons">
      <button class="btn btn-primary exit-xr">${texts.back}</button>
    </div>
  </div>
  
  ${options.includeLoadingScreen ? `
  <!-- Loading Screen -->
  <div class="loading-screen">
    <div class="loader"></div>
    <p>${texts.loading}</p>
  </div>
  ` : ''}
  
  <script>
    // App data
    const appData = ${JSON.stringify(data)};
    
    // DOM references
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const webxrView = document.querySelector('.webxr-view');
    const webxrCanvas = document.querySelector('.webxr-canvas');
    const exitXrButton = document.querySelector('.exit-xr');
    ${options.includeLoadingScreen ? 'const loadingScreen = document.querySelector(".loading-screen");' : ''}
    
    // Three.js variables
    let scene, camera, renderer, controls, currentModel;
    let xrSession = null;
    
    // Initialize app
    function init() {
      // Configure tabs
      tabs[0].classList.add('active');
      tabContents[0].style.display = 'block';
      
      for (let i = 1; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
      }
      
      // Assign events
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.style.display = 'none');
          
          tab.classList.add('active');
          const content = document.querySelector(\`.tab-content[data-content="\${tab.dataset.tab}"]\`);
          if (content) content.style.display = 'block';
        });
      });
      
      // AR/VR/3D button events
      document.querySelectorAll('.start-ar').forEach(button => {
        button.addEventListener('click', () => startAR(button.dataset.id));
      });
      
      document.querySelectorAll('.start-vr').forEach(button => {
        button.addEventListener('click', () => startVR(button.dataset.id));
      });
      
      document.querySelectorAll('.view-3d').forEach(button => {
        button.addEventListener('click', () => view3D(button.dataset.id));
      });
      
      // Exit XR event
      exitXrButton.addEventListener('click', exitXR);
      
      // Initialize Three.js
      initThree();
      
      ${options.includeLoadingScreen ? `
      // Hide loading screen
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1500);
      ` : ''}
    }
    
    // Initialize Three.js
    function initThree() {
      // Create scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      
      // Create camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({
        canvas: webxrCanvas,
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.xr.enabled = true;
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 5, 5);
      scene.add(directionalLight);
      
      // Orbit controls
      controls = new THREE.OrbitControls(camera, webxrCanvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      
      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
      
      // Start render loop
      renderer.setAnimationLoop(render);
    }
    
    // Render function
    function render() {
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    
    // Load 3D model
    function loadModel(modelUrl) {
      return new Promise((resolve, reject) => {
        if (currentModel) {
          scene.remove(currentModel);
          currentModel = null;
        }
        
        const loader = new THREE.GLTFLoader();
        
        loader.load(
          modelUrl,
          (gltf) => {
            const model = gltf.scene;
            
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            model.position.x = -center.x;
            model.position.y = -center.y;
            model.position.z = -center.z;
            
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
              model.scale.multiplyScalar(5 / maxDim);
            }
            
            scene.add(model);
            currentModel = model;
            
            resolve(model);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error) => {
            console.error('Error loading model:', error);
            reject(error);
          }
        );
      });
    }
    
    // Start AR experience
    function startAR(id) {
      if (!navigator.xr) {
        alert('${texts.arSupport}');
        return;
      }
      
      const experience = findExperience(id);
      if (!experience) return;
      
      webxrView.style.display = 'block';
      
      loadModel(experience.modelUrl).then(() => {
        navigator.xr.requestSession('immersive-ar', {
          requiredFeatures: ['hit-test']
        }).then(session => {
          xrSession = session;
          renderer.xr.setSession(session);
          
          session.addEventListener('end', () => {
            xrSession = null;
          });
        }).catch(error => {
          console.error('Error starting AR session:', error);
          alert('${texts.arSupport}');
          exitXR();
        });
      }).catch(error => {
        console.error('Error loading model:', error);
        exitXR();
      });
    }
    
    // Start VR experience
    function startVR(id) {
      if (!navigator.xr) {
        alert('${texts.vrSupport}');
        return;
      }
      
      const experience = findExperience(id);
      if (!experience) return;
      
      webxrView.style.display = 'block';
      
      loadModel(experience.modelUrl).then(() => {
        navigator.xr.requestSession('immersive-vr', {
          optionalFeatures: ['local-floor', 'bounded-floor']
        }).then(session => {
          xrSession = session;
          renderer.xr.setSession(session);
          
          session.addEventListener('end', () => {
            xrSession = null;
          });
        }).catch(error => {
          console.error('Error starting VR session:', error);
          alert('${texts.vrSupport}');
          exitXR();
        });
      }).catch(error => {
        console.error('Error loading model:', error);
        exitXR();
      });
    }
    
    // View 3D model (without XR)
    function view3D(id) {
      const experience = findExperience(id);
      if (!experience) return;
      
      webxrView.style.display = 'block';
      
      camera.position.set(0, 0, 5);
      controls.reset();
      
      loadModel(experience.modelUrl).catch(error => {
        console.error('Error loading model:', error);
        exitXR();
      });
    }
    
    // Exit XR experience
    function exitXR() {
      if (xrSession) {
        xrSession.end();
        xrSession = null;
      }
      
      webxrView.style.display = 'none';
    }
    
    // Find experience by ID
    function findExperience(id) {
      for (const category in appData.menu) {
        const experience = appData.menu[category].experiences.find(exp => exp.id === id);
        if (experience) return experience;
      }
      return null;
    }
    
    // Initialize app when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>`;
}; 