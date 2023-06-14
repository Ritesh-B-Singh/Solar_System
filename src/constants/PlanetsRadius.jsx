export const sunRadius = 30;
export const sunPosition = 0;

export const mercuryRadius = 10;
export const mercuryDistance = sunRadius + mercuryRadius + 10;
export const mercuryPosition = sunPosition + mercuryDistance;

export const venusRadius = 12;
export const venusDistance = mercuryDistance + mercuryRadius + venusRadius + 10;
export const venusPosition = sunPosition + venusDistance;

export const earthRadius = 14.5;
export const earthDistance = venusDistance + venusRadius + earthRadius + 10;
export const earthPosition = sunPosition + earthDistance;

export const marsRadius = 11.5;
export const marsDistance = earthDistance + earthRadius + marsRadius + 10;
export const marsPosition = sunPosition + marsDistance;

export const jupiterRadius = 17;
export const jupiterDistance = marsDistance + marsRadius + jupiterRadius + 20;
export const jupiterPosition = sunPosition + jupiterDistance;

export const saturnRadius = 16;
export const saturnRingInnerRadius = saturnRadius + 2;
export const saturnRingOuterRadius = saturnRadius + 6;
export const saturnDistance = jupiterDistance + jupiterRadius + saturnRadius + 20;
export const saturnPosition = sunPosition + saturnDistance;

export const uranusRadius = 14;
export const uranusRingInnerRadius = uranusRadius + 2;
export const uranusRingOuterRadius = uranusRadius + 6;
export const uranusDistance = saturnDistance + saturnRadius + uranusRadius + 20;
export const uranusPosition = sunPosition + uranusDistance;

export const neptuneRadius = 13.5;
export const neptuneDistance = uranusDistance + uranusRadius + neptuneRadius + 20;
export const neptunePosition = sunPosition + neptuneDistance;

export const rotationAnglesSun = 0.02;
export const rotationAnglesMercury = 0.02;
export const rotationAnglesVenus = 0.005;
export const rotationAnglesEarth = 0.015;
export const rotationAnglesMars = 0.007;
export const rotationAnglesJupiter = 0.002;
export const rotationAnglesSaturn = 0.004;
export const rotationAnglesUranus = 0.003;
export const rotationAnglesNeptune = 0.001;