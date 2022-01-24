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

type Props = {
  onClose: () => void;
  value: string;
} & InputProps;

export default function SearchInput(props: Props) {
  return (
    <InputGroup>
      {props.value === "" ? (
        <InputRightElement pointerEvents="none">
          <SearchIcon />
        </InputRightElement>
      ) : (
        <InputRightElement>
          <IconButton
            aria-label="Close"
            icon={<Icon as={CloseIcon} />}
            variant={"unstyled"}
            onClick={props.onClose}
          />
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
