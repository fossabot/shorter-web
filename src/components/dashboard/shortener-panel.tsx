"use client";

import { useState } from "react";
import { CalendarIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { shortenUrl } from "@/lib/server-actions";
import { toast } from "@/hooks/use-toast";

export function ShortenerPanel() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date>();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomShortCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setShortCode(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('url', url);
    formData.append('shortCode', shortCode);
    formData.append('expirationDate', expirationDate?.toISOString() ?? '');
    formData.append('description', description);

    const result = await shortenUrl(formData);

    setIsLoading(false);

    if (!result.success) {
      console.log('URL shortened failed:', result.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message,
      });
    } else {
      // Handle success (e.g., show success message, clear form)
      console.log('URL shortened successfully:', result.shortUrl);
      toast({
        title: "Success!",
        description: "The short pair is created.",
      })
      // Clear the form
      setUrl('');
      setShortCode('');
      setExpirationDate(undefined);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        <div className="space-y-2">
          <Label htmlFor="url">Original URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortCode">Short Code (Optional)</Label>
          <div className="flex space-x-2">
            <Input
              id="shortCode"
              placeholder="custom-code"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={generateRandomShortCode}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Expiration Date (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !expirationDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {expirationDate ? (
                  format(expirationDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={expirationDate}
                onSelect={setExpirationDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className=" space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="Enter a description for this shortened URL"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3">
        <Button type="submit" className="col-start-3 col-span-1" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
