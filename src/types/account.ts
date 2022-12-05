export interface Account {
    domain: string;
    name: string;
    owner: string;
    broker: string;
    valid_until: string;
    resources: [
      {
        uri: string;
        resource: string;
      }
    ];
    certificates: [string];
    metadata_uri: string;
  }
  