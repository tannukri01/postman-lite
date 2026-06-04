'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCollectionStore } from '@/store/useCollectionStore';
import { useRequestStore } from '@/store/useRequestStore';
import { CollectionItem } from './CollectionItem';
import { SaveRequestDialog } from './SaveRequestDialog';
import { Folder, Plus, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function CollectionsSidebar() {
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showNewCollection, setShowNewCollection] = useState(false);

  const { collections, addCollection, deleteCollection } = useCollectionStore();
  const { loadRequest, resetRequest } = useRequestStore();

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) {
      toast.error('Please enter a collection name');
      return;
    }
    addCollection(newCollectionName);
    setNewCollectionName('');
    setShowNewCollection(false);
    toast.success('Collection created!');
  };

  const generateDocs = (collectionId: string) => {
    const collection = collections.find((c) => c.id === collectionId);
    if (!collection) return;

    let markdown = `# ${collection.name}\n\n`;
    markdown += `${collection.description}\n\n`;
    markdown += `## API Endpoints\n\n`;

    collection.requests.forEach((req) => {
      markdown += `### ${req.name}\n\n`;
      markdown += `- **Method:** \`${req.method}\`\n`;
      markdown += `- **URL:** \`${req.url}\`\n\n`;

      if (req.headers.length > 0) {
        markdown += `**Headers:**\n\n`;
        markdown += `| Key | Value |\n`;
        markdown += `|-----|-------|\n`;
        req.headers
          .filter((h) => h.enabled)
          .forEach((h) => {
            markdown += `| ${h.key} | ${h.value} |\n`;
          });
        markdown += `\n`;
      }

      if (req.params.length > 0) {
        markdown += `**Query Parameters:**\n\n`;
        markdown += `| Key | Value |\n`;
        markdown += `|-----|-------|\n`;
        req.params
          .filter((p) => p.enabled)
          .forEach((p) => {
            markdown += `| ${p.key} | ${p.value} |\n`;
          });
        markdown += `\n`;
      }

      if (req.body && req.bodyType !== 'none') {
        markdown += `**Body (${req.bodyType}):**\n\n`;
        markdown += `\`\`\`${req.bodyType}\n${req.body}\n\`\`\`\n\n`;
      }

      markdown += `---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collection.name}-api-docs.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Documentation downloaded!');
  };

  return (
    <div className="w-72 border-r bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-sm flex items-center gap-2 text-foreground/80">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Folder className="w-3.5 h-3.5 text-white" />
            </div>
            Collections
          </h2>
          <div className="flex gap-1">
            <SaveRequestDialog />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={() => setShowNewCollection(!showNewCollection)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {showNewCollection && (
          <div className="space-y-2 animate-slide-in">
            <Input
              placeholder="Collection name..."
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
              className="bg-white/50 dark:bg-slate-800/50"
            />
            <Button size="sm" className="w-full" onClick={handleCreateCollection}>
              Create
            </Button>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {collections.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-8 px-4">
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                <Folder className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="font-medium">No collections yet</p>
              <p className="text-xs mt-1">Create one to get started</p>
            </div>
          )}

          {collections.map((collection) => (
            <div key={collection.id} className="space-y-1">
              <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-accent/50 group transition-colors">
                <span className="font-semibold text-sm">{collection.name}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-md"
                    onClick={() => generateDocs(collection.id)}
                    title="Generate Docs"
                  >
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-md"
                    onClick={() => deleteCollection(collection.id)}
                    title="Delete Collection"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </Button>
                </div>
              </div>

              {collection.requests.map((request) => (
                <CollectionItem
                  key={request.id}
                  request={request}
                  collectionId={collection.id}
                  onClick={() => loadRequest(request)}
                />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50">
        <Button variant="outline" className="w-full" size="sm" onClick={resetRequest}>
          <Plus className="w-4 h-4 mr-1" /> New Request
        </Button>
      </div>
    </div>
  );
}
