export interface Domain {
  name: string;
  admin: string;
  broker: string;
  valid_until: string;
  type: "open" | "closed";
}
