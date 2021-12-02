import {
  Box,
  BoxProps,
  Center,
  Stack,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Package } from "./Package";
import { useHype } from "./useHype";

export const HypeButton = (props: BoxProps) => {
  const { serverHype, addHype } = useHype();
  const [addedHype, setAddedHype] = React.useState(0);
  const [isAddingHype, setAddingHype] = React.useState(false);
  const [whatToShow, setWhatToShow] = React.useState<"added" | "total">(
    "total"
  );
  const [isMaxedOut, setMaxedOut] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const onPointerPressed = () => {
    clearTimeout(timeoutRef.current);
    setWhatToShow("added");
    setAddingHype(true);
    setAddedHype((prev) => Math.min(prev + 1, 50));
    intervalRef.current = setInterval(() => {
      setAddedHype((prev) => Math.min(prev + 1, 50));
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }, 150);
  };
  const onPointerReleased = () => {
    clearInterval(intervalRef.current);
    setAddingHype(false);
    timeoutRef.current = setTimeout(async () => {
      if (!isMaxedOut) {
        await addHype(addedHype);
      }
      setWhatToShow("total");
      setMaxedOut(addedHype === 50);
    }, 2000);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onPointerPressed();
    }
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onPointerReleased();
    }
  };

  const showNumber = serverHype > 0 || addedHype > 0;

  return (
    <Box {...props}>
      <Stack>
        <Box
          as="button"
          aria-label="Add hype"
          onPointerDown={onPointerPressed}
          onPointerUp={onPointerReleased}
          onPointerLeave={onPointerReleased}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          width="56px"
          mb={[10, 10, 0]}
        >
          <Box>
            <Package isOpen={isAddingHype} />
          </Box>
          {showNumber && (
            <Box userSelect="none" position="relative" top="-35px">
              <motion.div
                animate={{
                  scale: !prefersReducedMotion && addedHype % 2 ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Center
                  borderRadius="1em"
                  height="2em"
                  background="black"
                  color="white"
                  mx="auto"
                  px="0.5em"
                  width="fit-content"
                >
                  {whatToShow === "total"
                    ? getHypeDisplayValue(serverHype)
                    : `+${addedHype}`}
                </Center>
              </motion.div>
            </Box>
          )}
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
  return "🔥";
};
