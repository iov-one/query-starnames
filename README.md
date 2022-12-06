# @iov/query-starnames [![npm version](https://img.shields.io/npm/v/@iov/query-starnames.svg?style=flat-square)](https://www.npmjs.com/package/@iov/query-starnames)  

Client package to query starnames

## Installation  

```bash
yarn add @iov/query-starnames
```

## Usage  

```ts
import { StarnameQueryClient } from "query-starnames";

const client = new StarnameQueryClient("LCD_ENDPOINT here");

client.getAccountInfo()
```