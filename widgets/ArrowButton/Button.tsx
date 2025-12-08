"use client";

import React from "react";
import Link from "next/link";
import "./Button.css";

interface ArrowButtonProps {
  buttonText?: string;
  href?: string;
  onClick?: () => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  buttonText = "Arrow-Dots",
  href = "#",
  onClick,
}) => {
  // Function to generate dot elements for the icons
  const renderDots = () => {
    const dotValues = [2, 1, 0, 1, 2];
    return dotValues.map((value, index) => (
      <span
        key={`dot-${index}`}
        className="button05_dot"
        style={{ "--index": value } as React.CSSProperties}
      ></span>
    ));
  };

  // Generate icons with dot children
  const renderIcons = () => {
    return [3, 2, 1, 0].map((indexParent) => (
      <span
        key={`icon-${indexParent}`}
        className="button05_icon"
        style={{ "--index-parent": indexParent } as React.CSSProperties}
      >
        {renderDots()}
      </span>
    ));
  };

  return (
    <Link href={href} onClick={onClick} className="button05 w-inline-block">
      <span className="button05_bg"></span>

      <span className="button05_inner" data-text={buttonText}>
        <span className="button05_text">{buttonText}</span>

        <span className="button05_icon-wrap">{renderIcons()}</span>
      </span>
    </Link>
  );
};
