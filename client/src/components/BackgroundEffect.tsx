import ParticleCanvas from "@/components/ParticleCanvas";

type BackgroundEffectProps = {
  className?: string;
};

const BackgroundEffect = ({ className = "" }: BackgroundEffectProps) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none hidden md:block fixed inset-0 z-0 overflow-hidden ${className}`.trim()}
    >
      <div className="absolute inset-0 opacity-70">
        <ParticleCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
    </div>
  );
};

export default BackgroundEffect;