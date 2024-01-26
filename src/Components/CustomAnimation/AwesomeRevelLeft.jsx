import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100px, 10px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export default function AwesomeRevelLeft({ children }) {
    return <Reveal keyframes={customAnimation}>{children}</Reveal>;
}