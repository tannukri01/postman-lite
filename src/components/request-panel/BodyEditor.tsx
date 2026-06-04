'use client';

import { useRequestStore } from '@/store/useRequestStore';
import dynamic from 'next/dynamic';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export function BodyEditor() {
  const { currentRequest, setBody, setBodyType } = useRequestStore();

  if (currentRequest.method === 'GET' || currentRequest.method === 'HEAD') {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Body not available for {currentRequest.method} requests
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2 border-b">
        <span className="text-sm font-medium">Body Type:</span>
        <Select value={currentRequest.bodyType} onValueChange={(v) => setBodyType(v as any)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {currentRequest.bodyType !== 'none' && (
        <div className="flex-1 min-h-[200px]">
          <Editor
            height="100%"
            language={currentRequest.bodyType === 'json' ? 'json' : currentRequest.bodyType}
            value={currentRequest.body}
            onChange={(value) => setBody(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      )}
    </div>
  );
}
