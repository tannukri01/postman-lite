import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Collection, RequestData } from '@/types';

interface CollectionState {
  collections: Collection[];
  activeCollectionId: string | null;
  
  addCollection: (name: string, description?: string) => Collection;
  deleteCollection: (id: string) => void;
  addRequestToCollection: (collectionId: string, request: RequestData) => void;
  deleteRequestFromCollection: (collectionId: string, requestId: string) => void;
  setActiveCollection: (id: string | null) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set) => ({
      collections: [],
      activeCollectionId: null,

      addCollection: (name, description = '') => {
        const newCollection: Collection = {
          id: crypto.randomUUID(),
          name,
          description,
          requests: [],
          createdAt: Date.now(),
        };
        set((state) => ({
          collections: [...state.collections, newCollection],
          activeCollectionId: newCollection.id,
        }));
        return newCollection;
      },

      deleteCollection: (id) =>
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
          activeCollectionId: state.activeCollectionId === id ? null : state.activeCollectionId,
        })),

      addRequestToCollection: (collectionId, request) =>
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, requests: [...c.requests, { ...request, id: crypto.randomUUID() }] }
              : c
          ),
        })),

      deleteRequestFromCollection: (collectionId, requestId) =>
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, requests: c.requests.filter((r) => r.id !== requestId) }
              : c
          ),
        })),

      setActiveCollection: (id) => set({ activeCollectionId: id }),

      updateCollection: (id, updates) =>
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
    }),
    {
      name: 'postman-lite-collections',
    }
  )
);
