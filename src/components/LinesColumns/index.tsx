import React from "react";
import "./styles.scss";

export const LinesColumns = () => {
  const LINES_COLUMNS_LENGTH = 2;
  const LINES_LENGTH = 16;

  const linesColumnsArray = Array(LINES_COLUMNS_LENGTH).fill(0);
  const linesArray = Array(LINES_LENGTH).fill(0);

  return (
    <div className="lines-columns-container">
      {linesColumnsArray.map(() => (
        <div className="lines-column">
          {linesArray.map(() => (
            <div className="line" />
          ))}
        </div>
      ))}
    </div>
  );
};
