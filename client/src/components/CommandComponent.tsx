import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { FormEventHandler, useState } from "react";

interface CommandComponentProps {
  onChange: FormEventHandler<HTMLDivElement> | undefined
  placeholder: string
  suggestions: string[] | undefined
}

export function CommandComponent({onChange, placeholder, suggestions}: CommandComponentProps) {
    return (
      <Command onChange={onChange} className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput  placeholder={placeholder} />
        <CommandList>
         {suggestions && suggestions.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
           {suggestions&& <CommandGroup heading="Suggestions"> 
            {suggestions.map((suggestion) => (
              <CommandItem>
                <Calendar />
                <span>{suggestion}</span>
              </CommandItem>
            ))}
          </CommandGroup>}
        </CommandList>
      </Command>
    )
  }
  