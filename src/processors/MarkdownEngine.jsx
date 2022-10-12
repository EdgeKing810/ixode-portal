import React, { useEffect, useRef } from 'react';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';

import { Editor, Viewer } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

import { handleImage } from '../utils/handleImage';

export default function MarkdownEngine({
  title,
  data,
  setData,
  API_URL,
  PUBLIC_URL,
  alert,
  placeholder,
  addMedia,
  min,
  max,
  viewOnly,
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (editorRef && editorRef.current) {
        setData(editorRef.current.getInstance().getMarkdown());
      }
    }, 250);

    return () => clearInterval(checkInterval);
  }, [editorRef, setData]);

  const createUploadImageButton = () => {
    const button = document.createElement('button');

    button.className = '-ml-2 image toastui-editor-toolbar-icons';
    button.style.margin = '0';
    button.addEventListener('click', () => {
      handleImage(
        alert,
        API_URL,
        PUBLIC_URL,
        (i) => {
          if (i) {
            addMedia(i[1], i[0]);
            const update = `${data}\n![](${PUBLIC_URL}/${i[0]})`;
            editorRef.current.getInstance().setMarkdown(update);
            setData(update);
          }
        },
        true,
        false
      );
    });

    return button;
  };

  const getToolbarItems = () => {
    if (!viewOnly) {
      return [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        [
          'table',
          'link',
          {
            name: 'Upload Image',
            tooltip: 'Upload Image',
            command: 'image',
            el: createUploadImageButton(),
            hidden: viewOnly,
          },
        ],
        ['code', 'codeblock'],
      ];
    }

    return [];
  };

  return (
    <div className="bg-white p-2 rounded-lg my-2">
      {!viewOnly ? (
        <Editor
          title={title}
          initialValue={data}
          previewStyle="tab"
          initialEditType="markdown"
          useCommandShortcut={true}
          hideModeSwitch={true}
          toolbarItems={getToolbarItems()}
          ref={editorRef}
          placeholder={placeholder}
          min={min}
          max={max}
          plugins={[codeSyntaxHighlight]}
          height={viewOnly ? '800px' : '400px'}
        />
      ) : (
        <Viewer
          title={title}
          initialValue={data}
          initialEditType="markdown"
          useCommandShortcut={false}
          hideModeSwitch={true}
          toolbarItems={[]}
          plugins={[codeSyntaxHighlight]}
          height="800px"
        />
      )}
    </div>
  );
}
