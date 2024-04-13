import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Container } from "@tsparticles/engine";
import { useEffect, useState } from "react";

const options = {
  background: {
    color: {
      value: "#010110",
    },
  },
  fpsLimit: 120,
  interactivity: {
    detect_on: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      // buuble effect
      onHover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      bubble: {
        distance: 40,
        duration: 2,
        size: 0,
        opacity: 8,
      },
    },
  },
  particles: {
    number: {
      density: {
        enable: true,
        area: 1080,
      },
      limit: 0,
      value: 800,
    },
    color: {
      value: "#F7E7CE",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      animation: {
        enable: true,
        minimumValue: 0.05,
        speed: 0.25,
        sync: false,
      },
      random: {
        enable: true,
        minimumValue: 0.05,
      },
      value: 1,
    },
    size: {
      value: { min: 0, max: 1.5 },
      random: {
        enable: true,
        minimumValue: 0.5,
      },
      animation: {
        enable: true,
        speed: 2,
        size_min: 0,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  detectRetina: true,
};

const ParticleBackground = ({
  setLoaded,
}: {
  setLoaded: (loaded: boolean) => void;
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    setLoaded(true);
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticleBackground;
