import { useEffect } from "react";

function useOnScreenLoad(callback) {
  useEffect(() => {
    const executeCallback = async () => {
      await callback();
    };
    executeCallback();

    // Optionally, return a cleanup function
    return () => {
      console.log("Cleanup on screen unload");
    };
  }, [callback]);
}

export default useOnScreenLoad;
