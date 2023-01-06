export type DomainType = "open" | "closed";

export interface Domain {
  name: string;
  admin: string;
  broker: string;
  valid_until: string;
  type: DomainType;
}
