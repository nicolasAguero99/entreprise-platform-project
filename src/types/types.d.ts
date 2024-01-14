export interface MembersDb {
  id: number
  photo: string
  name: string
  email: string
  position: string
  salary: number
  paid: boolean
  createdAt: Date
}

export interface InvestorsDb {
  id: number
  photo: string
  name: string
  createdAt: Date
  investorsHistory: InvestorsHistoryDb[]
}

export interface InvestorsHistoryDb {
  id: number
  photo: string
  name: string
  createdAt: Date
  investorId: number
  amount: number
  investedIn: Date
  createdAt: Date
}

export interface SearchParams {
  page: string
  search: string
  order: OrderTypes | string
  month: Months
}

export type PaginationPages = number[]

export interface MembersAndPagination {
  data: MembersDb[] | InvestorsDb[]
  paginationPages: PaginationPages
  prev: number
  next: number
}

export interface InvestorsAndPagination {
  data: InvestorsDb[] | MembersDb[]
  paginationPages: PaginationPages
  prev: number
  next: number
}

export interface MembersAndPaginationProps {
  paginationPages: PaginationPages
  prev: number
  next: number
  page: string
  search: string
}

export enum ActionTypes {
  PREV_ACTION = 'prev',
  NEXT_ACTION = 'next',
  PAGE_ACTION = 'page'
}

export enum OrderTypes {
  DATE_ORDER = 'date',
  NAME_ORDER = 'name'
}

export enum TypeToAction {
  MEMBERS = 'members',
  INVESTORS = 'investors'
}

export type Months = null | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
