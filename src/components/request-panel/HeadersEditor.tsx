'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRequestStore } from '@/store/useRequestStore';
import { Header } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

export function HeadersEditor() {
  const { currentRequest, setHeaders } = useRequestStore();

  const addHeader = () => {
    setHeaders([...currentRequest.headers, { key: '', value: '', enabled: true }]);
  };

  const updateHeader = (index: number, field: keyof Header, value: string | boolean) => {
    const newHeaders = [...currentRequest.headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(currentRequest.headers.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Headers</h3>
        <Button variant="ghost" size="sm" onClick={addHeader}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      
      {currentRequest.headers.map((header, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={header.enabled}
            onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
            className="w-4 h-4"
          />
          <Input
            placeholder="Key"
            value={header.key}
            onChange={(e) => updateHeader(index, 'key', e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={header.value}
            onChange={(e) => updateHeader(index, 'value', e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" size="sm" onClick={() => removeHeader(index)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
}
