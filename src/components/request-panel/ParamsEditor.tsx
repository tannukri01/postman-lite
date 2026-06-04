'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRequestStore } from '@/store/useRequestStore';
import { Param } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

export function ParamsEditor() {
  const { currentRequest, setParams } = useRequestStore();

  const addParam = () => {
    setParams([...currentRequest.params, { key: '', value: '', enabled: true }]);
  };

  const updateParam = (index: number, field: keyof Param, value: string | boolean) => {
    const newParams = [...currentRequest.params];
    newParams[index] = { ...newParams[index], [field]: value };
    setParams(newParams);
  };

  const removeParam = (index: number) => {
    setParams(currentRequest.params.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Query Parameters</h3>
        <Button variant="ghost" size="sm" onClick={addParam}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      
      {currentRequest.params.map((param, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={param.enabled}
            onChange={(e) => updateParam(index, 'enabled', e.target.checked)}
            className="w-4 h-4"
          />
          <Input
            placeholder="Key"
            value={param.key}
            onChange={(e) => updateParam(index, 'key', e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={param.value}
            onChange={(e) => updateParam(index, 'value', e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" size="sm" onClick={() => removeParam(index)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
}
