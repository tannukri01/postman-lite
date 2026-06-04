'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MethodSelector } from './MethodSelector';
import { UrlBar } from './UrlBar';
import { HeadersEditor } from './HeadersEditor';
import { ParamsEditor } from './ParamsEditor';
import { BodyEditor } from './BodyEditor';
import { SlidersHorizontal, List, Code } from 'lucide-react';

export function RequestPanel() {
  return (
    <div className="flex flex-col h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-r border-border/50">
      <div className="flex items-center gap-3 p-4 pb-3">
        <MethodSelector />
        <div className="flex-1">
          <UrlBar />
        </div>
      </div>
      
      <Tabs defaultValue="params" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 bg-muted/50 p-1 rounded-lg h-9">
          <TabsTrigger value="params" className="text-xs gap-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Params
          </TabsTrigger>
          <TabsTrigger value="headers" className="text-xs gap-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
            <List className="w-3.5 h-3.5" />
            Headers
          </TabsTrigger>
          <TabsTrigger value="body" className="text-xs gap-1.5 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
            <Code className="w-3.5 h-3.5" />
            Body
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="params" className="flex-1 m-0 mt-2 overflow-auto">
          <ParamsEditor />
        </TabsContent>
        
        <TabsContent value="headers" className="flex-1 m-0 mt-2 overflow-auto">
          <HeadersEditor />
        </TabsContent>
        
        <TabsContent value="body" className="flex-1 m-0 mt-2 overflow-auto">
          <BodyEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
