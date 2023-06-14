import * as THREE from 'three';
import starsTexture from '../assets/stars.jpg';

const StarsTexture = () => {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const backgroundTexture = cubeTextureLoader.load([
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture,
    ]);
    backgroundTexture.encoding = THREE.sRGBEncoding;

    return backgroundTexture;
};

export default StarsTexture;
