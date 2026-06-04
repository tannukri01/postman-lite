'use client';

import { RequestData } from '@/types';
import { useCollectionStore } from '@/store/useCollectionStore';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface CollectionItemProps {
  request: RequestData;
  collectionId: string;
  onClick: () => void;
}

const methodColors: Record<string, string> = {
  GET: 'text-green-600',
  POST: 'text-blue-600',
  PUT: 'text-yellow-600',
  DELETE: 'text-red-600',
  PATCH: 'text-purple-600',
};

export function CollectionItem({ request, collectionId, onClick }: CollectionItemProps) {
  const { deleteRequestFromCollection } = useCollectionStore();

  return (
    <div
      className="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-accent group"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className={`text-xs font-semibold ${methodColors[request.method] || 'text-gray-600'}`}>
          {request.method}
        </span>
        <span className="text-sm truncate">{request.name}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          deleteRequestFromCollection(collectionId, request.id);
        }}
      >
        <Trash2 className="w-3 h-3 text-red-500" />
      </Button>
    </div>
  );
}
