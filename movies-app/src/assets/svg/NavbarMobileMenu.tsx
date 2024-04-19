import React, { useEffect } from "react";


interface NavbarMobileMenuProps {
  toggleMenu: boolean;
}

export const NavbarMobileMenu = ({ toggleMenu }: NavbarMobileMenuProps) => {

  useEffect(() => {
    if (toggleMenu) {
      console.log('toggled menu');
    }
  });

  return (
    <div className="menu_button">
      <svg
        className="mb-0.5 z-50"
        width="42"
        height="4"
        viewBox="0 0 45 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2H43"
          stroke="#000000"
          stroke-width="3"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_86_271"
            x1="22.5"
            y1="2"
            x2="22.5"
            y2="3"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFC800" />
            <stop offset="0.800781" stop-color="#FFDB58" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="mb-0.5"
        width="42"
        height="4"
        viewBox="0 0 45 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2H43"
          stroke="#000000"
          stroke-width="3"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_86_271"
            x1="22.5"
            y1="2"
            x2="22.5"
            y2="3"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFC800" />
            <stop offset="0.800781" stop-color="#FFDB58" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="42"
        height="4"
        viewBox="0 0 45 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2H43"
          stroke="#000000"
          stroke-width="3"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_86_271"
            x1="22.5"
            y1="2"
            x2="22.5"
            y2="3"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFC800" />
            <stop offset="0.800781" stop-color="#FFDB58" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}