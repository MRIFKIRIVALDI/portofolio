// Robot 3D. Muat Three.js r128 dan GLTFLoader sebelum file ini.
(() => {
    'use strict';

    const MODEL_URL = 'https://play.rosebud.ai/assets/Animated Robot2.glb?XU65';
    const ROTATION_SPEED = 0.3; // Radian per detik.

    function initRobot() {
        const container = document.getElementById('robot-container');
        if (!container || container.querySelector('canvas')) return;

        const THREE = window.THREE;
        if (!THREE || !THREE.GLTFLoader) {
            container.textContent = 'Robot tidak dapat dimuat. Periksa koneksi internet.';
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0, 5);

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true });
        } catch (error) {
            container.textContent = 'Tampilan 3D tidak tersedia di browser ini.';
            console.warn('Robot: WebGL tidak tersedia.', error);
            return;
        }

        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Pencahayaan model.
        scene.add(new THREE.AmbientLight(0x404040, 0.6));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        function resizeRenderer() {
            const width = container.clientWidth || 450;
            const height = container.clientHeight || 450;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        resizeRenderer();
        window.addEventListener('resize', resizeRenderer);

        let robotModel;
        let mixer;
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const delta = Math.min(clock.getDelta(), 0.1);

            if (mixer) mixer.update(delta);
            if (robotModel) robotModel.rotation.y += ROTATION_SPEED * delta;

            renderer.render(scene, camera);
        }

        // File GLB memuat bentuk robot serta animasi bawaannya.
        const loader = new THREE.GLTFLoader();
        loader.load(MODEL_URL, (gltf) => {
            robotModel = gltf.scene;
            robotModel.position.set(0, -0.5, 0);
            robotModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(robotModel);

            if (gltf.animations.length) {
                mixer = new THREE.AnimationMixer(robotModel);
                mixer.clipAction(gltf.animations[0]).play();
            }

            animate();
        }, undefined, (error) => {
            window.removeEventListener('resize', resizeRenderer);
            renderer.dispose();
            container.textContent = 'Robot tidak dapat dimuat. Periksa koneksi internet.';
            console.warn('Robot: gagal memuat model GLB.', error);
        });
    }

    // Bisa dipasang di akhir body, menggunakan defer, atau setelah halaman siap.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRobot, { once: true });
    } else {
        initRobot();
    }
})();
