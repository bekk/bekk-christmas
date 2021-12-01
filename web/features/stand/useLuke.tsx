import { useToast } from "@chakra-ui/react";
import React from "react";

export function useLuke() {
  const toast = useToast();
  const [currentLuke, setLuke] = React.useState(1);

  React.useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight": {
          setLuke((prev) => {
            const nextLuke = prev === 24 ? 1 : prev + 1;
            toast({
              title: "Neste luke!",
              description: `Nå viser vi luke ${nextLuke}`,
              status: "success",
            });
            return nextLuke;
          });
          return;
        }
        case "ArrowLeft": {
          setLuke((prev) => {
            const prevLuke = prev === 1 ? 24 : prev - 1;
            toast({
              title: "Forrige luke!",
              description: `Nå viser vi luke ${prevLuke}`,
              status: "success",
            });
            return prevLuke;
          });
          return;
        }
      }
    };
    window.addEventListener("keyup", handleKeypress);
    return () => window.removeEventListener("keyup", handleKeypress);
  }, [toast]);
  return {
    currentLuke,
  };
}
