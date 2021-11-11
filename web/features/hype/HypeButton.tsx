import { Box, BoxProps, Center, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Package } from "./Package";
import { useHype } from "./useHype";

export const HypeButton = (props: BoxProps) => {
  const { serverHype, addHype } = useHype();
  const [addedHype, setAddedHype] = React.useState(0);
  const [showMode, setShowMode] = React.useState<"added" | "total">("total");
  const [isMaxedOut, setMaxedOut] = React.useState(false);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const onPointerPressed = () => {
    clearTimeout(timeoutRef.current);
    setShowMode("added");
    if (isMaxedOut) {
      return;
    }
    setAddedHype((prev) => Math.min(prev + 1, 50));
    intervalRef.current = setInterval(() => {
      setAddedHype((prev) => Math.min(prev + 1, 50));
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }, 100);
  };
  const onPointerReleased = () => {
    clearInterval(intervalRef.current);
    timeoutRef.current = setTimeout(async () => {
      if (!isMaxedOut) {
        await addHype(addedHype);
      }
      setShowMode("total");
      setMaxedOut(addedHype === 50);
    }, 2000);
  };
  return (
    <Box {...props}>
      <Stack>
        <Box
          as="button"
          aria-label="Add hype"
          onPointerDown={onPointerPressed}
          onPointerUp={onPointerReleased}
          width="60px"
        >
          <Box>
            <motion.div
              animate={{
                rotate: addedHype === 0 ? 0 : addedHype % 2 ? -5 : 5,
              }}
              transition={{ duration: 0.1 }}
            >
              <Package />
            </motion.div>
          </Box>
          <Box>
            <motion.div
              animate={{
                scale: addedHype % 2 ? 1.1 : 1,
              }}
              transition={{ duration: 0.1 }}
            >
              <Center
                borderRadius="1em"
                height="2em"
                background="black"
                color="white"
                mx="auto"
              >
                {showMode === "total"
                  ? serverHype
                  : `+${getHypeDisplayValue(addedHype)}`}
              </Center>
            </motion.div>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

const getHypeDisplayValue = (hype: number) => {
  if (hype < 1000) {
    return hype;
  }
  if (hype < 1000000) {
    return `${(hype / 1000).toFixed(1)}K`;
  }
  return "🔥🔥🔥";
};
