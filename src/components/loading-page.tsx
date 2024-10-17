import MotoLogLogo from "./icons/moto-log-logo";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <MotoLogLogo className="animate-pulse"/>
    </div>
  );
};

export default LoadingPage;