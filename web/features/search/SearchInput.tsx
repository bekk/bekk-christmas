import {
  InputGroup,
  InputRightElement,
  Input,
  Icon,
  IconButton,
  BoxProps,
  InputProps,
} from "@chakra-ui/react";
import { SearchIcon } from "./SearchIcon";
import { CloseIcon } from "./CloseIcon";
import { SearchBarIcon } from "./SearchBarIcon";

type Props = {
  onClose: () => void;
  value: string;
} & InputProps;

export default function SearchInput(props: Props) {
  return (
    <InputGroup>
      {props.value === "" ? (
        <InputRightElement pointerEvents="none" mr={-4}>
          <SearchIcon mr={2} />
          <SearchBarIcon />
        </InputRightElement>
      ) : (
        <InputRightElement mr={-4}>
          <IconButton
            aria-label="Close"
            icon={<Icon as={CloseIcon} />}
            variant={"unstyled"}
            onClick={props.onClose}
            alignItems={"center"}
            mr={1}
          />
          <SearchBarIcon mr={2} />
        </InputRightElement>
      )}
      <Input
        color="white"
        border="0px"
        borderBottom="4px"
        borderRadius="+0px"
        {...props}
      />
    </InputGroup>
  );
}
