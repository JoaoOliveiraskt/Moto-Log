import React from "react";

const BgGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background hidden lg:dark:flex ">
      <div
        className="absolute bottom-0 left-0 right-0 top-0
        dark:bg-[radial-gradient(circle_900px_at_0%_0%,#fbfbfb20,transparent)]"
      ></div>

      <div
        className="absolute bottom-0 left-0 right-0 top-0 
        dark:bg-[radial-gradient(circle_800px_at_100%_100%,#fbfbfb15,transparent)]"
      ></div>
    </div>
  );
};

export default BgGradient;
