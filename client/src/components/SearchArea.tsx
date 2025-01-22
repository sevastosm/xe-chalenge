import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect } from "react";
import { getAreas } from "@/api";

interface Suggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
}

interface SearchAreaProps {
  value: Suggestion | string;
  setValue: (value: Suggestion) => void;
}

export function SearchArea({ value, setValue }: SearchAreaProps) {
  const [open, setOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<Suggestion[] | null>(
    null
  );

  const handleInputChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = event.target.value.toLowerCase();
      if (searchTerm.length > 3) {
        try {
          const response = await getAreas(searchTerm);
          setSuggestions(response);
        } catch (error) {
          console.error("Error fetching areas:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions(null);
      }
    },
    [setSuggestions]
  );

  useEffect(() => {
    console.log("suggestions", suggestions);
  }, [suggestions]);

  const handleSelect = (selected: Suggestion) => {
    setValue(selected);
    setOpen(false);
  };

  return (
    <div className="max-w-[400px] relative">
      <Popover
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)} // Explicitly manage popover state
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {!suggestions && value && typeof value === 'object'
              && value.mainText
            }
            {value && suggestions && typeof value === 'object'
              ? suggestions.find((suggestion: any) => suggestion.placeId === value.placeId)
                ?.mainText
              : "Search area..."} 
            <ChevronsUpDown className="opacity-50 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={4}
          align="start"
          className="w-[300px] p-0 rounded-md shadow-md"
        >
          <Command shouldFilter={false} onChange={handleInputChange}>
            <CommandInput
              placeholder="Search area..."
              className="h-9"
            />
            <CommandList>
              {!suggestions || suggestions.length === 0 ? (
                <CommandEmpty>No areas found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.placeId}
                      onSelect={() => handleSelect(suggestion)}
                    >
                      <div className="font-medium">{suggestion.mainText}</div>
                      <div className="text-sm text-muted-foreground">
                        {suggestion.secondaryText}
                      </div>
                      <Check
                        className={cn(
                          "ml-auto",
                          value.placeId === suggestion.placeId ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
