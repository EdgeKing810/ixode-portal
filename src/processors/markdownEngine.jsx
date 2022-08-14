import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';

import { useThemeStore } from '../stores/useThemeStore';

import '../assets/css/markdown.css';

const components = (children) => ({
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const { theme } = useThemeStore.getState();

    return !inline && match ? (
      <div
        className={`${
          theme === 'dark'
            ? 'bg-main-dark text-main-dark'
            : 'text-main-light bg-main-light'
        }`}
      >
        <SyntaxHighlighter
          style={theme === 'dark' ? dark : light}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      </div>
    ) : (
      <code
        className={`text-main-dark ${className} text-main-dark rounded-lg ${
          theme === 'dark' ? 'bg-main-dark' : 'bg-main-light'
        }`}
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
        rel="noopenner noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
});

export default function Parser({ smaller, children }) {
  const { theme } = useThemeStore((state) => state);

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={components}
      className={`w-full markdown-body ${
        theme === 'light'
          ? 'text-main-dark bg-main-lightbg'
          : 'text-main-light bg-main-darkbg'
      } list-disc ${
        smaller ? 'text-xs' : 'text-sm'
      } lg:text-base p-2 lg:p-4 rounded-lg`}
    >
      {children}
    </ReactMarkdown>
  );
}
