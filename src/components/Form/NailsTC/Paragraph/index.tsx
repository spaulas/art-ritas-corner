import React, { useContext } from "react";
import type { Text } from "data.d";
import { LanguageContext } from "context/LanguageProvider";

type TCParagraphProps = {
  text: Text;
};

const TCParagraph = ({ text }: TCParagraphProps) => {
  const { language } = useContext(LanguageContext);

  return <div className="nails-tc-paragrapht">{text[language]}</div>;
};

export default TCParagraph;
