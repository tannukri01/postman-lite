'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRequestStore } from '@/store/useRequestStore';
import { makeRequest } from '@/lib/api-client';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function UrlBar() {
  const { currentRequest, setUrl, setResponse, setLoading, isLoading } = useRequestStore();

  const handleSend = async () => {
    if (!currentRequest.url) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);
    try {
      const response = await makeRequest(currentRequest);
      setResponse(response);
      
      if (response.status >= 200 && response.status < 300) {
        toast.success(`Success: ${response.status} ${response.statusText}`);
      } else if (response.status >= 400) {
        toast.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter request URL..."
        value={currentRequest.url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
      />
      <Button 
        onClick={handleSend} 
        disabled={isLoading} 
        className="px-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-70"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        Send
      </Button>
    </div>
  );
}
