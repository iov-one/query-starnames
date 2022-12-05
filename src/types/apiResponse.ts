import { Domain } from "./domain";
import { PaginationPage } from "./page";
import { Account } from "./account";

export interface OwnerAccountsResolveResponse {
  accounts: ReadonlyArray<Account>;
  page: PaginationPage;
}

export interface OwnerDomainsResolveResponse {
  domains: ReadonlyArray<Domain>;
  page: PaginationPage;
}

export interface ResourceAccountsResolveResponse
  extends OwnerAccountsResolveResponse {}

export interface AccountResolveResponse {
  account: Account;
}

export interface DomainInfoResolveResponse {
  domain: Domain;
}
