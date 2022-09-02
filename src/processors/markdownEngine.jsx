import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy, coyWithoutShadows, darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, hopscotch, materialDark, materialLight, materialOceanic, nord, okaidia, pojoaque, prism, shadesOfPurple, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism';
// import dark from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic';
// import light from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';

import '../assets/css/markdown.css';

const chosenStyle = "dracula";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || ''); 

    const prismStyles = {
      a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy, coyWithoutShadows, darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, hopscotch, materialDark, materialLight, materialOceanic, nord, okaidia, pojoaque, prism, shadesOfPurple, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai
    }
    
    return !inline && match ? (
        <SyntaxHighlighter
          style={prismStyles[chosenStyle] ? prismStyles[chosenStyle] : prismStyles['materialOceanic']}
          language={match[1]}
          showLineNumbers={true}
          children={String(children).replace(/\n$/, '')}
        />
    ) : (
      <code
        className={`${match && match[1] ? 'text-base-content' : 'text-base-content'} ${className} rounded-lg`}
        {...props}
      >
        {children}
      </code>
    );
  },
  a: ({ children, href }) => {
    return (
      <a
        href={href}
        className={`outline-none w-full text-xs sm:text-base font-semibold font-spartan opacity-35 hover:opacity-65 focus:opacity-65`}
        rel="noopenner noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    return (
      <img
        src={src}
        alt={alt}
        className={`outline-none w-full object-scale-down`}
      />
    );
  },
};

export default function Parser({ smaller, children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={components}
      className={`w-full markdown-body text-base-content bg-base-300 list-disc ${
        smaller ? 'text-xs' : 'text-sm'
      } lg:text-base p-2 lg:p-4 rounded-lg`}
    >
      {children}
    </ReactMarkdown>
  );
}
