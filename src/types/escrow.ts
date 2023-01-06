export enum EscrowState {
  /** ESCROW_STATE_OPEN - ESCROW_STATE_OPEN defines an open state. */
  ESCROW_STATE_OPEN = 0,
  /** ESCROW_STATE_COMPLETED - ESCROW_STATE_COMPLETED defines a completed state. */
  ESCROW_STATE_COMPLETED = 1,
  /** ESCROW_STATE_REFUNDED - ESCROW_STATE_REFUNDED defines a refunded state. */
  ESCROW_STATE_REFUNDED = 2,
  /** ESCROW_STATE_EXPIRED - ESCROW_STATE_REFUNDED defines an expired state. */
  ESCROW_STATE_EXPIRED = 3,
  UNRECOGNIZED = -1,
}

export interface EscrowDomainObject {
  readonly type: "starname/Domain";
  readonly value: {
    name: string;
    admin: string;
    valid_until: string;
    type: string;
  };
}

export interface EscrowAccountObject {
  domain: string;
  name: string;
  owner: string;
  valid_until: string;
}

export type EscrowObject = EscrowDomainObject | EscrowAccountObject;

export interface ApiEscrow {
  readonly id: string;
  readonly seller: string;
  readonly object: EscrowObject;
  readonly price: [
    {
      denom: string;
      amount: string;
    }
  ];
  readonly state?: EscrowState;
  readonly deadline: string;
  readonly broker_address: string;
  readonly broker_commission: string;
}

export interface Escrow extends ApiEscrow {
  readonly state: EscrowState;
}

export interface ModifiableEscrowFields {
  readonly amount: string;
  readonly deadline: Date;
  readonly seller: string;
}

export const isEscrowDomainObject = (
  obj: EscrowDomainObject | any
): obj is EscrowDomainObject => {
  return obj.type !== undefined && obj.type === "starname/Domain";
};

export const isEscrowAccountObject = (
  obj: EscrowAccountObject | any
): obj is EscrowAccountObject => {
  if (
    "domain" in obj &&
    "name" in obj &&
    "owner" in obj &&
    "valid_until" in obj
  ) {
    if (typeof obj.owner === "string" && obj.owner.length > 43) return true;
    return false;
  }
  return false;
};

export const toCommonEscrowState = (escrow: ApiEscrow): Escrow => {
  return {
    ...escrow,
    state:
      escrow.state === undefined ? EscrowState.ESCROW_STATE_OPEN : escrow.state,
  };
};
