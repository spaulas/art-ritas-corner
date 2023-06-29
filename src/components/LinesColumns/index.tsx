import React from "react";
import "./styles.scss";

export const LinesColumns = () => {
  const LINES_COLUMNS_LENGTH = 2;
  const LINES_LENGTH = 16;

  const linesColumnsArray = Array(LINES_COLUMNS_LENGTH).fill(0);
  const linesArray = Array(LINES_LENGTH).fill(0);

  return (
    <div className="lines-columns-container">
      {linesColumnsArray.map((_value, columnIndex) => (
        <div key={`lines-column-${columnIndex}`} className="lines-column">
          {linesArray.map((_value, lineIndex) => (
            <div key={`line-${columnIndex}-${lineIndex}`} className="line" />
          ))}
        </div>
      ))}
    </div>
  );
};
