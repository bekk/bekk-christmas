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

const CALENDAR_YEARS = [2021, 2020, 2019, 2018, 2017];

const Calendar = (props: CalendarProps) => {
  const showYearNumber = new Date().getFullYear() !== Number(props.year);
  const filteredYears = CALENDAR_YEARS.filter((year) => year !== props.year);
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
      {showYearNumber && (
        <Heading
          mt={12}
          color="white"
          fontSize={["1.5rem", "2rem", "2.5rem"]}
          fontWeight="normal"
        >
          Calendar {props.year}
        </Heading>
      )}
      <SimpleGrid columns={[2, 3, 4, 6]} gap="24px" margin="30px 0 40px" px={6}>
        {listOf24Days.map((day) => (
          <Day key={day} day={day} year={props.year} />
        ))}
      </SimpleGrid>
      {filteredYears.length > 0 && (
        <Text color="white" mb="80px" textShadow="2xl" mx={6}>
          Also check out the calendars from{" "}
          {filteredYears.map((year, index) => (
            <React.Fragment key={year}>
              <TextLink href={`/post/${year}`}>{year}</TextLink>
              {getSeparator(index, filteredYears)}
            </React.Fragment>
          ))}
        </Text>
      )}
    </Center>
  );
};

export default Calendar;

type DayProps = {
  day: number;
  year: number;
};

function Day({ day, year }: DayProps) {
  const isOpen = new Date() > new Date(year, 11, day);
  const degreeTable = [-3, -2, -1, 1, 2, 3];
  const degreesToSkew = degreeTable[(day - 1) % degreeTable.length];
  return (
    <Link href={`/post/${year}/${day}`} passHref>
      <Box
        as="a"
        color="brand.white"
        border={"3px white " + (isOpen ? "solid" : "dotted")}
        opacity={isOpen ? "1" : "0.6"}
        width="150px"
        height="150px"
        transition=".25s ease-out"
        transformOrigin="top"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        padding="10px"
        _hover={{
          transform: `rotateX(-30deg) skew(${degreesToSkew}deg, 0) scale(1, 1.05)`,
          boxShadow: "xl",
          background: "rgba(255, 255, 255, 0.375)",
        }}
        _focus={{
          transform: `rotateX(-30deg) skew(${degreesToSkew}deg, 0) scale(1, 1.05)`,
          boxShadow: "xl",
          background: "rgba(255, 255, 255, 0.375)",
        }}
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
