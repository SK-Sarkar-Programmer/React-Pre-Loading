import { useEffect, useState } from "react";

const useResourceLoader = (resources, timeout = 30000) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalResources = resources.length;

  useEffect(() => {
    const timeouts = [];
    const processedResources = new Set();

    const handleResourceLoad = (resource, success = true, errorMsg = "") => {
      // Prevent duplicate processing
      if (processedResources.has(resource.src)) {
        return;
      }

      processedResources.add(resource.src);

      setLoadedCount((prev) => {
        const newCount = prev + 1;
        setProgress(Math.round((newCount / totalResources) * 100));

        if (newCount === totalResources) {
          // Clear all timeouts when all resources are processed
          timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
          setLoading(false);
        }

        return newCount;
      });

      if (!success) {
        setErrors((prev) => [
          ...prev,
          { resource: resource.src, error: errorMsg },
        ]);
      }
    };

    resources.forEach((resource) => {
      // Set timeout for each resource
      const timeoutId = setTimeout(() => {
        handleResourceLoad(
          resource,
          false,
          `Timeout after ${timeout / 1000} seconds`
        );
      }, timeout);

      timeouts.push(timeoutId);

      if (resource.type === "image") {
        const img = new Image();
        img.src = resource.src;
        img.onload = () => {
          clearTimeout(timeoutId);
          handleResourceLoad(resource);
        };
        img.onerror = () => {
          clearTimeout(timeoutId);
          handleResourceLoad(resource, false, "Failed to load image");
        };
      } else if (resource.type === "video") {
        const video = document.createElement("video");
        video.src = resource.src;

        video.addEventListener("loadeddata", () => {
          clearTimeout(timeoutId);
          handleResourceLoad(resource);
        });

        video.addEventListener("canplaythrough", () => {
          clearTimeout(timeoutId);
          handleResourceLoad(resource);
        });

        video.addEventListener("error", () => {
          clearTimeout(timeoutId);
          handleResourceLoad(resource, false, "Failed to load video");
        });

        // Preload video without playing
        video.preload = "auto";
      }
    });

    // Cleanup function to clear timeouts if component unmounts
    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [resources, timeout, totalResources]);

  return { loading, progress, errors, loadedCount, totalResources };
};

export default useResourceLoader;
