'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequestStore } from '@/store/useRequestStore';
import { useCollectionStore } from '@/store/useCollectionStore';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export function SaveRequestDialog() {
  const [open, setOpen] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');

  const { currentRequest } = useRequestStore();
  const { collections, addCollection, addRequestToCollection } = useCollectionStore();

  const handleSave = () => {
    if (!requestName.trim()) {
      toast.error('Please enter a request name');
      return;
    }

    let collectionId = selectedCollection;

    if (selectedCollection === 'new') {
      if (!newCollectionName.trim()) {
        toast.error('Please enter a collection name');
        return;
      }
      const newCollection = addCollection(newCollectionName);
      collectionId = newCollection.id;
    }

    if (!collectionId) {
      toast.error('Please select or create a collection');
      return;
    }

    addRequestToCollection(collectionId, {
      ...currentRequest,
      name: requestName,
    });

    toast.success('Request saved!');
    setOpen(false);
    setRequestName('');
    setNewCollectionName('');
    setSelectedCollection('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-1" /> Save
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Request Name</Label>
            <Input
              placeholder="e.g., Get User Profile"
              value={requestName}
              onChange={(e) => setRequestName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Collection</Label>
            <Select value={selectedCollection} onValueChange={setSelectedCollection}>
              <SelectTrigger>
                <SelectValue placeholder="Select collection..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">+ Create New Collection</SelectItem>
                {collections.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCollection === 'new' && (
            <div className="space-y-2">
              <Label>New Collection Name</Label>
              <Input
                placeholder="e.g., User API"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
            </div>
          )}

          <Button onClick={handleSave} className="w-full">
            Save Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
