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

export interface SearchParams {
  page: string
  search: string
  order: OrderTypes | string
}

export type PaginationPages = number[]

export interface MembersAndPagination {
  data: MembersDb[]
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
