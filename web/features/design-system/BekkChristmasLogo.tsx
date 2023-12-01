import {
  Box,
  BoxProps,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import React from "react";

export const BekkChristmasLogo = (props: BoxProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const spin = keyframes`
    from { transform: rotate(360deg)}
    to { transform: rotate(0deg)}
  `;

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} 20s linear infinite`;

  return (
    <Box
      as="svg"
      aria-label="Bekk Christmas"
      width="250px"
      fill="brand.white"
      viewBox="0 0 250 243"
      animation={animation}
      {...props}
    >
      <path d="m210.437 59.691-.25.171c3.174 6.267 2.966 12.275-2.786 16.196-7.19 4.902-14.268.564-18.96-6.319l-10.492-15.39 1.659-1.865 4.637 3.712 29.885-20.375-1.761-5.673 2.342-.864 9.085 13.326c6.057 8.884 5.83 15.27-.232 19.405-3.691 2.515-9.467 2.24-13.127-2.324zm-5.138-9.419 2.815 4.13c2.687 3.941 6.6 4.848 10.914 1.906 4.377-2.983 5.66-6.607 1.566-12.615l-1.793-2.627zm-2.752 1.875-14.38 9.804 1.085 3.203 1.065 1.563c4.309 6.32 8.552 6.633 13.678 3.138 4.377-2.983 5.035-8.198 1.835-12.89zM205.542 104.953c.542 3.67 1.902 6.147 4.439 8.834l-1.578 1.226c-4.516-2.09-7.175-5.6-8.027-11.367-1.182-8.012 3.417-15.192 14.646-16.842 11.153-1.64 18.405 4.486 19.642 12.872.994 6.74-2.48 12.223-10.04 13.334-1.195.177-2.478.29-3.946.197l-3.006-20.368c-8.607 1.267-13.058 5.823-12.13 12.114zm15.384-12.362 2.022 13.703c.535-.003 1.508-.144 2.032-.22 4.717-.694 6.91-2.93 6.335-6.823-.53-3.595-3.873-6.546-10.39-6.66zM200.659 137.24l-1.823-1.572 4.146-13.926 2.03.606.145 3.755 39.02 11.648 4.589-3.21.797.237.239 10.34-.346 1.161-31.477-9.398-.175 2.712 6.63 13.275 2.558-3.818 1.952 1.136-3.456 11.605-2.254-.12-.48-4.487-6.1-12.405-18.454 6.022-3.013 4.55-1.794-1.405 2.85-9.575 18.379-5.492.82-2.756-11.895-3.55zM182.097 169.984l-.931-2.219 9.922-10.61 1.548 1.448-1.544 3.425 29.742 27.83 5.539-.827.609.57-4.397 9.357-.826.883-23.993-22.449-1.366 2.347.018 14.835 3.992-2.274 1.24 1.887-8.267 8.842-1.965-1.113 1.57-4.228.07-13.82-19.21-2.847-4.726 2.727-.98-2.057 6.822-7.294 18.903 3.285 1.965-2.1-9.067-8.483zM137.673 223.665c6.18-1.11 9.093-6.712 7.643-14.76-1.44-7.973-6.15-12.358-12.705-11.178-3.351.601-5.67 2.25-8.09 4.608l-1.276-1.54c2.343-5.345 6.259-7.51 11.1-8.382 7.896-1.42 15.076 3.444 17.039 14.323 1.907 10.581-4.135 18.437-13.146 20.057-5.14.924-9.81-.236-10.615-4.708-.484-2.682.967-4.867 3.426-5.309 2.309-.414 4.514.728 4.999 3.41.24 1.34-.2 2.728-1.035 3.646.697.033 1.318.075 2.66-.167zM89.346 211.708c-1.062 4.102.957 6.268 3.887 7.03 2.564.666 5.872.276 8.304-.968l5.449-21.026-4.767-2.725 1.503-1.876 14.064 3.655-.532 2.052-3.766.351-10.193 39.341 3.375 4.474-.208.806-10.32.603-1.173-.305 5.923-22.858-.293-.076c-3.774 3.398-8.587 3.87-11.882 3.011-4.248-1.104-8.074-4.444-6.137-11.917l5.069-19.56-4.767-2.724 1.502-1.878 14.064 3.656-.532 2.051-3.765.351zM65.404 174.49l2.189-1.149 12.49 10.077-1.328 1.65-3.53-1.292-13.815 17.141.264 5.462-.521.647-9.256-2.993-.883-.714 5.067-5.924-.235-.19c-4.131 2.11-9.063 2.8-12.42.088-2.768-2.233-3.126-5.049-1.274-7.345 1.898-2.355 4.487-2.309 6.312-.837 2.122 1.711 2.125 4.241.464 6.302 2.62.851 5.636.368 8.865-.624l12.06-14.962zM47.798 151.244l2.379-.35 7.819 12.255-1.787 1.14-2.934-2.349-18.562 11.841-1.489 5.261-.7.45-7.821-5.79-.651-1.022 25.386-16.194zm-34.227 32.162c-1.425-2.235-.802-5.057 1.43-6.48 2.232-1.424 5.054-.8 6.48 1.435 1.425 2.234.802 5.057-1.43 6.48-2.232 1.424-5.054.8-6.48-1.435zM36.047 145.827c5.823-4.75 6.786-8.039 5.783-12.003-.837-3.302-2.567-5.208-6.016-4.336-2.788.703-3.92 2.707-4.238 6.691l-.409 4.554c-.426 4.793-2.415 8.341-7.844 9.714-6.308 1.593-10.47-2.197-12.028-8.363-.372-1.467-.602-4.533-.166-6.204l-2.139-3.209 9.242-2.959.905 1.411c-4.63 4.528-5.52 7.487-4.723 10.643.78 3.082 3.024 4.546 5.665 3.88 2.641-.669 3.995-2.417 4.33-6.327l.335-4.536c.462-5.27 2.267-8.929 7.843-10.337 6.529-1.649 10.488 2.582 12.141 9.115.761 3.01.513 5.727.152 7.692l2.523 2.877-10.399 3.33zM9.44 113.587 0 103.12l.151-1.506 8.96.91 1.107-10.996 3.486.886-1.053 10.468 19.573 1.985c4.218.427 6.131-1.204 6.449-4.367.212-2.109-.066-3.886-.966-6.26l1.958-.563c2.46 2.76 3.678 5.774 3.185 10.67-.508 5.045-3.463 7.94-10.162 7.261l-20.703-2.1-.431 4.292zM54.657 63.506l4.183-3.55 1.252 2.053-8.222 11.978-1.747-1.2.953-3.66-15.599-10.72c-3.495-2.4-6.09-1.43-7.673.878-1.413 2.06-1.96 5.265-1.618 7.976L43.78 79.353l4.184-3.553 1.253 2.055-8.223 11.978-1.746-1.2 1.013-3.618L22.104 72.54l-5.425.68-.686-.472 2.268-9.459.641-.935 5.113 3.788.17-.25c-2.358-5.66-1.235-9.57.692-12.378 2.012-2.932 5.46-4.878 10.013-3.218l.172-.249c-2.36-5.661-1.236-9.57.692-12.377 2.483-3.618 7.066-5.612 13.429-1.238L65.53 47.664l4.183-3.552 1.253 2.054-8.222 11.98-1.748-1.2.952-3.663L46.35 42.565c-3.495-2.403-6.089-1.43-7.674.877-1.413 2.059-1.96 5.264-1.618 7.977zM96.212 29.962c1.41 3.184 2.955 3.494 6.652 1.192l.884 1.431c-.91 2.058-2.4 3.547-5.028 4.712-2.491 1.103-5.148.708-6.89-1.915l-.277.122c-.08 3.182-2.655 6.145-6.043 7.646-5.187 2.298-9.942 1.093-12.458-4.581-2.67-6.021.614-11.12 8.36-14.553 1.315-.581 2.967-1.148 4.266-1.393l-1.63-3.667c-1.81-4.082-5.33-4.925-9.132-3.24-2.627 1.165-5.057 3.152-7.011 6.585l-1.788-1.608c1.316-5.054 4.292-8.61 9.273-10.815 5.187-2.299 11.31-1.368 14.04 4.79zm-11.2-3.98c-5.325 2.36-7.956 5.016-5.93 9.582 1.35 3.046 3.955 3.88 6.789 2.623 2.352-1.043 3.736-2.401 4.559-4.835l-3.62-8.167zM110.039 23.352c3.303 6.754 6.286 8.443 10.37 8.37 3.405-.063 5.652-1.313 5.587-4.87-.054-2.877-1.747-4.435-5.554-5.654l-4.34-1.438c-4.568-1.508-7.57-4.256-7.673-9.855-.121-6.508 4.513-9.695 10.868-9.808 1.512-.027 4.549.449 6.078 1.254L128.982 0l.785 9.676-1.58.558c-3.356-5.541-6.032-7.084-9.286-7.025-3.177.057-5.111 1.908-5.061 4.632.05 2.725 1.445 4.441 5.176 5.662l4.339 1.36c5.026 1.652 8.175 4.245 8.282 9.997.124 6.735-4.892 9.624-11.626 9.747-3.102.055-5.691-.807-7.522-1.607l-3.372 1.8-.882-10.885z" />
    </Box>
  );
};
