export interface MembersDb {
  id: number
  photo: string
  name: string
  email: string
  createdAt: Date
}

export interface InvoicesDb extends MembersDb {
  position: string
  salary: number
  paid: boolean
}

export interface InvestorsDb {
  id: number
  photo: string
  name: string
  createdAt: Date
  investorsHistory: InvestorsHistoryDb[]
}

export interface BalanceDb {
  id: number
  action: string
  amount: number
  date: Date
  createdAt: Date
}

export interface InvestorsHistoryDb {
  id: number
  investorId: number
  amount: number
  investedIn: string
  createdAt: Date
}

export interface SearchParams {
  page: string
  search: string
  order: OrderTypes | string
  month: Months
}

export type PaginationPages = number[]

export interface PaginationParams {
  paginationPages: PaginationPages
  page: string
  prev: number
  next: number
  search: string
}

export interface MembersAndPaginationProps extends PaginationParams {
  data: MembersDb[]
}

export interface InvoicesAndPaginationProps extends PaginationParams {
  data: InvoicesDb[]
}

export interface InvestorsAndPagination extends PaginationParams {
  data: InvestorsDb[]
}

export interface BalanceAndPagination extends PaginationParams {
  data: BalanceDb[]
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
  INVESTORS = 'investors',
  BALANCE = 'balance'
}

export type Months = null | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'

export type TabsBalanceParams = 'total' | 'income' | 'expenses'

export interface AmountByMonth {
  amount: number
  investedIn: string
}

export type PositionCount = Record<string, number>

export interface CardHeader {
  type: string
  title: string
}
