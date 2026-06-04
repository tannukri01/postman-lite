'use client';

import { useRequestStore } from '@/store/useRequestStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function ResponseHeaders() {
  const { response } = useRequestStore();

  if (!response) return null;

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-2">
        {Object.entries(response.headers).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between py-1">
              <span className="text-sm font-medium text-muted-foreground">{key}</span>
              <span className="text-sm">{value}</span>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
