import { Box, BoxProps, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { theme } from "../../utils/theme";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { ShapeBackground } from "../shapes/ShapeBackground";
import { SiteFooter } from "../site-footer/SiteFooter";

const listOf24Days = Array(24)
  .fill(0)
  .map((_, i) => i + 1);

type CalendarProps = {
  year: number | string;
};

const Calendar = (props: CalendarProps) => {
  const showYearNumber = new Date().getFullYear() !== Number(props.year);
  const columns = [2, 3, 4, 6];
  return (
    <Center
      position="relative"
      flexDirection="column"
      minHeight="100vh"
      overflowX="hidden"
    >
      <BekkChristmasLogo
        position={["relative", "relative", "absolute"]}
        top={["5vmin", "5vmin", "3vmin"]}
        right={["0vmin", "0vmin", "3vmin"]}
        width={["20vmin", "15vmin", "10vmin"]}
      />
      <ShapeBackground />
      {showYearNumber && (
        <Heading
          mt={12}
          color="white"
          fontSize={["2rem", "2.5rem", "3rem"]}
          fontWeight="normal"
        >
          The {props.year} calendar
        </Heading>
      )}
      <SimpleGrid columns={columns} gap="24px" margin="30px 0 80px" px={6}>
        {listOf24Days.map((day) => (
          <Day key={day} day={day} year={props.year} columns={columns} />
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Calendar;

type DayProps = {
  day: number;
  year: number | string;
  columns: number[];
};

const getSkewDegrees = (columns, maxSkewDegrees, day) => {
  // Generate a list of lists like [-3, -1, 1, -3]
  const degreeMatrix = columns.map((col) => {
    const degrees = [];
    for (let i = 0; i < col; i++) {
      degrees.push(-maxSkewDegrees + i * ((2 * maxSkewDegrees) / (col - 1)));
    }
    return degrees;
  });

  // Decide the degrees of a given day based on day number
  return degreeMatrix.map((degrees) => degrees[(day - 1) % degrees.length]);
};

function Day({ day, year, columns }: DayProps) {
  const maxSkewDegrees = 3; // The skewed degrees will span from -maxSkewDegrees to maxSkewDegrees
  const degreesToSkew = getSkewDegrees(columns, maxSkewDegrees, day);

  // Map out list of transforms based on column dimensions / breakpoints
  const activeStyle = {
    transform: degreesToSkew.map(
      (degrees) => `rotateX(-30deg) skew(${degrees}deg, 0) scale(1, 1.05)`
    ),
    boxShadow: "xl",
    background: "rgba(255, 255, 255, 0.375)",
  };

  return (
    <Link href={`/post/${year}/${day}`} passHref>
      <Box
        as="a"
        color="brand.white"
        border="3px solid white"
        width="150px"
        height="150px"
        transition=".25s ease-out"
        transformOrigin="top"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        padding="10px"
        _hover={activeStyle}
        _focus={activeStyle}
      >
        <Heading
          as="h2"
          fontSize="40px"
          fontWeight="400"
          lineHeight="1"
          aria-label={`See the articles for day ${day}`}
        >
          {day}
        </Heading>
      </Box>
    </Link>
  );
}
