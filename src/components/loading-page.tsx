import MotoLogLogo from "./icons/moto-log-logo";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <MotoLogLogo link="#" className="animate-pulse" svgHeight={500} svgWidth={500}/>
    </div>
  );
};

export default LoadingPage;