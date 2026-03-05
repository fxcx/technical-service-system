"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, UserPlus, Check, User } from "lucide-react";
import type { Client } from "@/types";
import { NewClientDialog } from "@/components/clients/new-client-dialog";

interface ClientSearchInputProps {
  clients: Client[];
  value: string; // selected clientId
  onClientSelected: (clientId: string) => void;
  onClientCreated: (client: Client) => void;
}

export function ClientSearchInput({
  clients,
  value,
  onClientSelected,
  onClientCreated,
}: ClientSearchInputProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [initialName, setInitialName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The currently selected client object
  const selectedClient = value ? clients.find((c) => c.id === value) : null;

  // Filter clients based on the search query
  const filteredClients = useCallback(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)),
    );
  }, [query, clients]);

  const matches = filteredClients();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(client: Client) {
    onClientSelected(client.id);
    setQuery("");
    setIsOpen(false);
  }

  function handleClear() {
    onClientSelected("");
    setQuery("");
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleCreateNew() {
    setInitialName(query.trim());
    setShowNewClientDialog(true);
    setIsOpen(false);
  }

  function handleClientCreated(client: Client) {
    onClientCreated(client);
    onClientSelected(client.id);
    setQuery("");
    setShowNewClientDialog(false);
  }

  // Highlight matching text in a string
  function highlight(text: string, q: string) {
    if (!q || q.length < 2) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-100 text-yellow-900 rounded px-0.5">
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  }

  // --- If a client is already selected, show a "pill" ---
  if (selectedClient) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 min-h-10">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-tight truncate">
            {selectedClient.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {selectedClient.phone}
            {selectedClient.email ? ` · ${selectedClient.email}` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="ml-1 shrink-0 rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          aria-label="Quitar cliente seleccionado"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // --- Search UI ---
  return (
    <>
      <div ref={containerRef} className="relative">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            placeholder="Buscar por nombre, teléfono o email…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(e.target.value.trim().length >= 2);
            }}
            onFocus={() => {
              if (query.trim().length >= 2) setIsOpen(true);
            }}
            className="pl-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg overflow-hidden">
            {matches.length > 0 ? (
              <ul className="max-h-56 overflow-y-auto py-1">
                {matches.map((client) => (
                  <li key={client.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(client)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-accent transition-colors group"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">
                          {highlight(client.name, query)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {client.phone && highlight(client.phone, query)}
                          {client.email && (
                            <span className="before:content-['·'] before:mx-1">
                              {highlight(client.email, query)}
                            </span>
                          )}
                        </p>
                      </div>
                      <Check className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  </li>
                ))}
                {/* Create new at the bottom of match list */}
                <li className="border-t border-border">
                  <button
                    type="button"
                    onClick={handleCreateNew}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <UserPlus className="h-4 w-4 shrink-0" />
                    <span className="text-sm">Crear nuevo cliente</span>
                  </button>
                </li>
              </ul>
            ) : (
              <div className="py-1">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No se encontró ningún cliente con ese criterio.
                </div>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-accent transition-colors border-t border-border"
                >
                  <UserPlus className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm font-medium">
                    Crear:{" "}
                    <span className="text-primary">&ldquo;{query}&rdquo;</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <NewClientDialog
        open={showNewClientDialog}
        onOpenChange={setShowNewClientDialog}
        onClientCreated={handleClientCreated}
        initialName={initialName}
      />
    </>
  );
}
