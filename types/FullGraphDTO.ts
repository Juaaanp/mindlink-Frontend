
export interface FullGraphDTO {
  nodes: {
    id: string;
    name: string; // <-- agrega esto
  }[];
  links: {
    source: string;
    target: string;
  }[];
}

