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

const V1BETA1 = "/starname/v1beta1";

export class StarnameQueryClient {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl + V1BETA1;
  }

  async getAccountInfo(starname: string): Promise<Account> {
    const response = await axios.get<AccountResolveResponse>(
      `${this.apiUrl}/account/${starname}`
    );
    return response.data.account;
  }

  async getDomainInfo(domain: string): Promise<Domain> {
    const response = await axios.get<DomainInfoResolveResponse>(
      `${this.apiUrl}/domain/name/${domain}`
    );
    return response.data.domain;
  }

  async getAccounts(address: string): Promise<ReadonlyArray<Account>> {
    const response = await axios.get<OwnerAccountsResolveResponse>(
      `${this.apiUrl}/accounts/owner/${address}`
    );
    return response.data.accounts;
  }

  async getDomains(address: string): Promise<ReadonlyArray<Domain>> {
    const response = await axios.get<OwnerDomainsResolveResponse>(
      `${this.apiUrl}/domains/owner/${address}`
    );
    return response.data.domains;
  }

  async resourceAccounts(
    uri: string,
    resource: string
  ): Promise<ReadonlyArray<Account>> {
    const response = await axios.get<ResourceAccountsResolveResponse>(
      `${this.apiUrl}/accounts/resource/${uri}/${resource}`
    );
    return response.data.accounts;
  }
}
