import React, { useState, useEffect } from 'react';

const SQLEditor = ({ value, onChange }) => {
  const [MonacoEditor, setMonacoEditor] = useState(null);

  useEffect(() => {
    import('@monaco-editor/react').then((module) => {
      setMonacoEditor(() => module.default);
    });
  }, []);

  if (!MonacoEditor) {
    return <div className="sql-editor" style={{ padding: '1rem' }}>Loading editor...</div>;
  }

  return (
    <MonacoEditor
      height="300px"
      language="sql"
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on',
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        tabCompletion: 'on',
        quickSuggestions: true,
        glyphMargin: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 1,
        folding: false,
        renderLineHighlight: 'none',
        hideCursorInOverviewRuler: true,
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
      }}
    />
  );
};

export default SQLEditor;