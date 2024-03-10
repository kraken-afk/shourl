'use client';

import { createContext, PropsWithChildren, useState } from "react";

export const ShortUrlContext = createContext<ReturnType<typeof useState<string>> | null>(null);

export function ShortUrlProvider(props: PropsWithChildren) {
  const [state, setState] = useState<string | undefined>("");
  return (
    <ShortUrlContext.Provider value={[state, setState]}>
      {props.children}
    </ShortUrlContext.Provider>
  )
}
