import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/material-oceanic";
import light from "react-syntax-highlighter/dist/esm/styles/prism/material-light";

import "../assets/css/markdown.css";

const components = (children) => ({
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const theme = "dark";

    return !inline && match ? (
      <SyntaxHighlighter
        style={match[1] && theme === "dark" ? dark : light}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code
        className={`text-gray-900 ${className} text-gray-900 rounded-lg`}
        {...props}
      >
        {children}
      </code>
    );
  },
  a: (props) => {
    return (
      <a
        href={props.href}
        className={`outline-none w-full text-xs sm:text-base font-semibold font-spartan opacity-35 hover:opacity-65 focus:opacity-65`}
      >
        {children}
      </a>
    );
  },
});

export default function Parser({ smaller, children }) {
  const theme = "dark";

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={components}
      className={`w-full markdown-body ${
        theme === "light" ? "text-gray-900" : "text-gray-100"
      } list-disc ${smaller ? "text-xs" : "text-sm"} lg:text-base`}
    >
      {children}
    </ReactMarkdown>
  );
}
