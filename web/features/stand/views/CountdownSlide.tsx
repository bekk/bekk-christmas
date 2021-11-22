import { Box, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
type CountdownSlideProps = {
  secondsLeft: number;
};
export const CountdownSlide = ({ secondsLeft }: CountdownSlideProps) => {
  const [pulse, setPulse] = React.useState(false);
  React.useEffect(() => {
    setPulse((prev) => !prev);
  }, [secondsLeft]);

  return (
    <Center minHeight="100vh" background="brand.darkGreen">
      <Box fontFamily="heading" color="white" fontSize="10em">
        <motion.div
          animate={{ scale: pulse ? [1, 1.2, 1, 1.2] : [1.2, 1, 1.2, 1] }}
        >
          {secondsLeft}
        </motion.div>
      </Box>
    </Center>
  );
};
