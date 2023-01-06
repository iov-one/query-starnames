import axios from "axios";
import {
  AccountResolveResponse,
  DomainInfoResolveResponse,
  OwnerAccountsResolveResponse,
  OwnerDomainsResolveResponse,
  ResourceAccountsResolveResponse,
} from "./types/apiResponse";
import { Domain } from "./types/domain";
import { Account } from "./types/account";
import { ApiEscrow, Escrow, toCommonEscrowState } from "./types/escrow";
import { GenericApiResponse } from "./types/genericApiResponse";

const STARNAME_CONTEXT = "/starname/v1beta1";
const ESCROW_CONTEXT = "/escrow";

export class StarnameQueryClient {
  private starnameApiUrl: string;
  private escrowApiUrl: string;

  constructor(apiUrl: string) {
    this.starnameApiUrl = apiUrl + STARNAME_CONTEXT;
    this.escrowApiUrl = apiUrl + ESCROW_CONTEXT;
  }

  async getAccountInfo(starname: string): Promise<Account> {
    const {
      data: { account },
    } = await axios.get<AccountResolveResponse>(
      `${this.starnameApiUrl}/account/${starname}`
    );
    return account;
  }

  async getDomainInfo(domain: string): Promise<Domain> {
    const {
      data: { domain: resultDomain },
    } = await axios.get<DomainInfoResolveResponse>(
      `${this.starnameApiUrl}/domain/name/${domain}`
    );
    return resultDomain;
  }

  async getAccounts(address: string): Promise<ReadonlyArray<Account>> {
    const {
      data: { accounts },
    } = await axios.get<OwnerAccountsResolveResponse>(
      `${this.starnameApiUrl}/accounts/owner/${address}`
    );
    return accounts;
  }

  async getDomains(address: string): Promise<ReadonlyArray<Domain>> {
    const {
      data: { domains },
    } = await axios.get<OwnerDomainsResolveResponse>(
      `${this.starnameApiUrl}/domains/owner/${address}`
    );
    return domains;
  }

  async getResourceAccounts(
    uri: string,
    resource: string
  ): Promise<ReadonlyArray<Account>> {
    const {data: {accounts}} = await axios.get<ResourceAccountsResolveResponse>(
      `${this.starnameApiUrl}/accounts/resource/${uri}/${resource}`
    );
    return accounts;
  }

  async getEscrows(
    seller?: string,
    state?: "open" | "expired",
    starname?: string,
    pageStart?: number,
    pageLength?: number
  ): Promise<ReadonlyArray<Escrow>> {
    const params = new URLSearchParams();
    if (seller) params.set("seller", seller);
    if (state) params.set("state", state);
    if (starname)
      params.set(
        "object",
        Buffer.from(
          starname.indexOf("*") === 0
            ? starname.slice(1)
            : starname.split("*").reverse().join("*")
        ).toString("hex")
      );
    if (pageStart) params.set("pagination_start", pageStart.toString());
    if (pageLength) params.set("pagination_length", pageLength.toString());
    const stringedSearchParams = params.toString();
    const {
      data: {
        result: { escrows },
      },
    } = await axios.get<
      GenericApiResponse<{ escrows: ReadonlyArray<ApiEscrow> | null }>
    >(
      `${this.escrowApiUrl}/escrows` +
        (stringedSearchParams ? `?${stringedSearchParams}` : "")
    );
    return escrows ? escrows.map(toCommonEscrowState) : [];
  }

  async getEscrow(escrowId: string): Promise<Escrow> {
    const {
      data: {
        result: { escrow },
      },
    } = await axios.get<GenericApiResponse<{ escrow: ApiEscrow }>>(
      `${this.escrowApiUrl}/escrow/${escrowId}`
    );
    return toCommonEscrowState(escrow);
  }
}
