import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import sunTexture from '../assets/sun.jpg';
import mercuryTexture from '../assets/mercury.jpg';
import venusTexture from '../assets/venus.jpg';
import earthTexture from '../assets/earth.jpg';
import marsTexture from '../assets/mars.jpg';
import jupiterTexture from '../assets/jupiter.jpg';
import saturnTexture from '../assets/saturn.jpg';
import saturnRingTexture from '../assets/saturnRing.jpg';
import uranusRingTexture from '../assets/uranusRing.jpg';
import uranusTexture from '../assets/uranus.jpg';
import neptuneTexture from '../assets/neptune.jpg';
import StarsTexture from './StarsTexture';
import Orbit from './Orbit';

const ThreeScene = () => {
    const mountRef = useRef(null);
    const [isRotating, setIsRotating] = useState(true);
    const [selectedPlanet, setSelectedPlanet] = useState('')
    const rotationAngles = useRef({
        sun: 0,
        mercury: 0,
        venus: 0,
        earth: 0,
        mars: 0,
        jupiter: 0,
        saturn: 0,
        uranus: 0,
        neptune: 0,
    });

    useEffect(() => {
        // Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        camera.position.set(-90, 140, 140);

        // Adding stars
        var vertices = [];
        var numPoints = 2000;
        for (var i = 0; i < numPoints; i++) {
            var x = THREE.MathUtils.randFloatSpread(2500);
            var y = THREE.MathUtils.randFloatSpread(2500);
            var z = THREE.MathUtils.randFloatSpread(2500);

            vertices.push(x, y, z);
        }
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        var material = new THREE.PointsMaterial({
            color: 0xfffbb8,
            sizeAttenuation: false,
            size: 2,
        });

        var points = new THREE.Points(geometry, material);
        scene.add(points);

        // Load Background Texture
        scene.background = <StarsTexture />;

        // Ambient Light
        const ambient = new THREE.AmbientLight(0x333333);
        scene.add(ambient);

        // Loading planets
        const textureLoader = new THREE.TextureLoader();

        const sunGeo = new THREE.SphereGeometry(30, 50, 50);
        const sunMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(sunTexture),
        });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sun);

        const pointLight = new THREE.PointLight(0xffffff, 3, 300);
        scene.add(pointLight);

        function createPlanet(size, texture, position, ring, name) {
            const geometry = new THREE.SphereGeometry(size, 50, 50);
            const material = new THREE.MeshStandardMaterial({
                map: textureLoader.load(texture),
            });
            
            const planet = new THREE.Mesh(geometry, material);
            const planetObj = new THREE.Object3D();
            // planetObj.add(planet);
            const planetTransparentSphere = new THREE.Mesh(geometry, material);
            planetTransparentSphere.position.x = position;
            planetTransparentSphere.name = name;
            planetObj.add(planetTransparentSphere);
            scene.add(planetObj);
            planet.position.x = position;


            if (ring) {
                const RingGeometry = new THREE.RingGeometry(
                    ring.innerRadius,
                    ring.outerRadius,
                    100
                );
                const RingMaterial = new THREE.MeshStandardMaterial({
                    map: textureLoader.load(ring.texture),
                    side: THREE.DoubleSide,
                });
                const Ring = new THREE.Mesh(RingGeometry, RingMaterial);
                planetObj.add(Ring);

                Ring.position.x = position;
                Ring.rotation.x = -0.5 * Math.PI;
            }

            // Orbit Circle
            const orbit = Orbit(position);
            scene.add(orbit);

            renderer.domElement.addEventListener('click', onClick, false);

            function onClick(event) {
                // Calculate mouse coordinates
                var mouse = new THREE.Vector2();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                // Create a raycaster from the camera position
                var raycaster = new THREE.Raycaster();
                raycaster.params.Points.threshold = 10;
                raycaster.setFromCamera(mouse, camera);

                // Check for intersections with the mesh
                var intersects = raycaster.intersectObject(planetTransparentSphere);

                if (intersects.length > 0) {
                    setSelectedPlanet(name);
                    console.log(name);
                }
            }

            const canvasWidth = renderer.domElement.clientWidth;
            const canvasHeight = renderer.domElement.clientHeight;

            console.log(`Canvas width: ${canvasWidth}`);
            console.log(`Canvas height: ${canvasHeight}`);


            return () => {
                renderer.domElement.removeEventListener('click', onClick, false);
            }, { planet, planetObj };
        }

        const sunRadius = 30;
        const sunPosition = 0;

        const mercuryRadius = 10;
        const mercuryDistance = sunRadius + mercuryRadius + 10;
        const mercuryPosition = sunPosition + mercuryDistance;

        const venusRadius = 12;
        const venusDistance = mercuryDistance + mercuryRadius + venusRadius + 10;
        const venusPosition = sunPosition + venusDistance;

        const earthRadius = 14.5;
        const earthDistance = venusDistance + venusRadius + earthRadius + 10;
        const earthPosition = sunPosition + earthDistance;

        const marsRadius = 11.5;
        const marsDistance = earthDistance + earthRadius + marsRadius + 10;
        const marsPosition = sunPosition + marsDistance;

        const jupiterRadius = 17;
        const jupiterDistance = marsDistance + marsRadius + jupiterRadius + 20;
        const jupiterPosition = sunPosition + jupiterDistance;

        const saturnRadius = 16;
        const saturnRingInnerRadius = saturnRadius + 2;
        const saturnRingOuterRadius = saturnRadius + 6;
        const saturnDistance = jupiterDistance + jupiterRadius + saturnRadius + 20;
        const saturnPosition = sunPosition + saturnDistance;

        const uranusRadius = 14;
        const uranusRingInnerRadius = uranusRadius + 2;
        const uranusRingOuterRadius = uranusRadius + 6;
        const uranusDistance = saturnDistance + saturnRadius + uranusRadius + 20;
        const uranusPosition = sunPosition + uranusDistance;

        const neptuneRadius = 13.5;
        const neptuneDistance = uranusDistance + uranusRadius + neptuneRadius + 20;
        const neptunePosition = sunPosition + neptuneDistance;

        // Usage in createPlanet function
        const mercury = createPlanet(mercuryRadius, mercuryTexture, mercuryPosition, {}, 'Mercury');
        const venus = createPlanet(venusRadius, venusTexture, venusPosition, {}, 'Venus');
        const earth = createPlanet(earthRadius, earthTexture, earthPosition, {}, 'Earth');
        const mars = createPlanet(marsRadius, marsTexture, marsPosition, {}, 'Mars');
        const jupiter = createPlanet(jupiterRadius, jupiterTexture, jupiterPosition, {}, 'Jupiter');
        const saturn = createPlanet(saturnRadius, saturnTexture, saturnPosition, {
            innerRadius: saturnRingInnerRadius,
            outerRadius: saturnRingOuterRadius,
            texture: saturnRingTexture,
        }, 'Saturn');
        const uranus = createPlanet(uranusRadius, uranusTexture, uranusPosition, {
            innerRadius: uranusRingInnerRadius,
            outerRadius: uranusRingOuterRadius,
            texture: uranusRingTexture,
        }, 'Uranus');
        const neptune = createPlanet(neptuneRadius, neptuneTexture, neptunePosition, {}, 'Neptune');

        // Orbit Controls
        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.update();

        function animate() {
            if (isRotating) {
                rotationAngles.current.sun += 0.02;

                rotationAngles.current.mercury += 0.01;
                rotationAngles.current.venus += 0.004;
                rotationAngles.current.earth += 0.013;
                rotationAngles.current.mars += 0.005;
                rotationAngles.current.jupiter += 0.002;
                rotationAngles.current.uranus += 0.004;
                rotationAngles.current.neptune += 0.003;
                rotationAngles.current.saturn += 0.001;
            }

            sun.rotation.y = rotationAngles.current.sun;
            mercury.planet.rotation.y = rotationAngles.current.mercury;
            mercury.planetObj.rotation.y = rotationAngles.current.mercury;
            venus.planet.rotation.y = rotationAngles.current.venus;
            venus.planetObj.rotation.y = rotationAngles.current.venus;
            earth.planet.rotation.y = rotationAngles.current.earth;
            earth.planetObj.rotation.y = rotationAngles.current.earth;
            mars.planet.rotation.y = rotationAngles.current.mars;
            mars.planetObj.rotation.y = rotationAngles.current.mars;
            jupiter.planet.rotation.y = rotationAngles.current.jupiter;
            jupiter.planetObj.rotation.y = rotationAngles.current.jupiter;
            uranus.planet.rotation.y = rotationAngles.current.uranus;
            uranus.planetObj.rotation.y = rotationAngles.current.uranus;
            neptune.planet.rotation.y = rotationAngles.current.neptune;
            neptune.planetObj.rotation.y = rotationAngles.current.neptune;
            saturn.planet.rotation.y = rotationAngles.current.saturn;
            saturn.planetObj.rotation.y = rotationAngles.current.saturn;

            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        return () => {
            renderer.setAnimationLoop(null);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [isRotating]);

    const handleToggleRotation = () => {
        setIsRotating((prev) => !prev);
    };

    return (
        <div style={{ overflow: 'hidden' }}>
            <div>
                <button
                    style={{
                        color: 'white',
                        backgroundColor: 'black',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onClick={handleToggleRotation}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkred')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'black')}
                >
                    {isRotating ? 'Pause Rotation' : 'Start Rotation'}
                </button>
                <span style={{ marginLeft: '10px', fontSize: '14px', color: 'white' }}>
                    {selectedPlanet ? `Selected Planet: ${selectedPlanet}` : 'No planet selected'}
                </span>
            </div>  
            <div style={{ maxHeight: '92vh' }} ref={mountRef} />
        </div>
    );
};

export default ThreeScene;