import React from "react";

import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const SocialShare = [
  { Social: <FaGithub size="20" />, link: "https://github.com/jerkodeur" },
  {
    Social: <FaLinkedinIn size="20" />,
    link: "https://www.linkedin.com/in/j%C3%A9r%C3%B4me-poti%C3%A9/"
  }
];
const Social = () => {
  return (
    <div className="social-share-inner">
      <ul className="social-share social-style--2 color-theme d-flex justify-content-start liststyle">
        {SocialShare.map((val, i) => (
          <li key={i}>
            <a href={`${val.link}`} target="_blank" rel="noopener noreferrer">
              {val.Social}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Social;
