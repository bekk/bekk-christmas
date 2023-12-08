import { Box, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { getSeparator } from "../../utils/string";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { TextLink } from "../design-system/TextLink";
import { ShapeBackground } from "../shapes/ShapeBackground";

const listOf24Days = Array(24)
  .fill(0)
  .map((_, i) => i + 1);

type CalendarProps = {
  year: number;
};

const Calendar = (props: CalendarProps) => {
  const START_YEAR = 2017;
  const CURRENT_YEAR = new Date().getFullYear();
  const CALENDAR_YEARS = Array.from(
    { length: CURRENT_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i,
  ).reverse();
  const filteredYears = CALENDAR_YEARS.filter((year) => year !== props.year);
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
        top={["5vmin", "5vmin", "-6vmin"]}
        right={["0vmin", "0vmin", "-6vmin"]}
        width={["30vmin", "24vmin", "20vmin"]}
      />
      <ShapeBackground />
      {CURRENT_YEAR !== props.year && (
        <Heading
          mt={12}
          color="white"
          fontSize={["1.5rem", "2rem", "2.5rem"]}
          fontWeight="normal"
        >
          Calendar {props.year}
        </Heading>
      )}
      <SimpleGrid columns={columns} gap="24px" margin="30px 0 40px" px={6}>
        {listOf24Days.map((day) => (
          <Day key={day} day={day} year={props.year} columns={columns} />
        ))}
      </SimpleGrid>
      <Box mx={4}>
        {filteredYears.length > 0 && (
          <Text color="white" textShadow="2xl" mt={6}>
            Also check out the calendars from{" "}
            {filteredYears.map((year, index) => (
              <React.Fragment key={year}>
                <TextLink href={`/post/${year}`}>{year}</TextLink>
                {getSeparator(index, filteredYears)}
              </React.Fragment>
            ))}
          </Text>
        )}
        <Text color="white" mb="80px" textShadow="2xl" mt={2}>
          You can also browse all articles sorted by{" "}
          <TextLink href="/category">categories</TextLink>
        </Text>
      </Box>
    </Center>
  );
};

export default Calendar;

type DayProps = {
  day: number;
  year: number;
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
  const isOpen = new Date() >= new Date(year, 11, day);
  const maxSkewDegrees = 3; // The skewed degrees will span from -maxSkewDegrees to maxSkewDegrees
  const degreesToSkew = getSkewDegrees(columns, maxSkewDegrees, day);

  // Map out list of transforms based on column dimensions / breakpoints
  const activeStyle = {
    transform: degreesToSkew.map(
      (degrees) => `rotateX(-30deg) skew(${degrees}deg, 0) scale(1, 1.05)`,
    ),
    boxShadow: "xl",
    background: "rgba(255, 255, 255, 0.375)",
  };
  return (
    <Link href={`/post/${year}/${day.toString().padStart(2, "0")}`} passHref>
      <Box
        as="span"
        color="brand.white"
        border={`3px white ${isOpen ? "solid" : "dotted"}`}
        cursor={isOpen ? "pointer" : "default"}
        opacity={isOpen ? "1" : "0.6"}
        pointerEvents={isOpen ? "all" : "none"}
        width="150px"
        height="150px"
        transition=".25s ease-out"
        transformOrigin="top"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        padding="10px"
        _hover={isOpen ? activeStyle : undefined}
        _focus={isOpen ? activeStyle : undefined}
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
