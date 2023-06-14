import * as THREE from 'three';

const Orbit = (position) => {
    console.log(position)
    let pts = new THREE.Path().absarc(0, 0, position, 0, Math.PI * 2).getPoints(90);
    let orbitGeometry = new THREE.BufferGeometry().setFromPoints(pts);
    orbitGeometry.rotateX(Math.PI * 0.5);
    let orbitMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
    });
    let orbitObj = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitObj.rotation.x = 1 * Math.PI;

    return orbitObj;
};

export default Orbit;
