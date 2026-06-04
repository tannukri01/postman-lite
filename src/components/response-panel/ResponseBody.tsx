'use client';

import { useRequestStore } from '@/store/useRequestStore';
import Editor from '@monaco-editor/react';

export function ResponseBody() {
  const { response } = useRequestStore();

  if (!response) return null;

  const language = response.body.trim().startsWith('{') || response.body.trim().startsWith('[')
    ? 'json'
    : 'text';

  return (
    <div className="h-full min-h-[300px]">
      <Editor
        height="100%"
        language={language}
        value={response.body}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
}
