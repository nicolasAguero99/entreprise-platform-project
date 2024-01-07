export interface MembersDb {
  id: number
  name: string
  email: string
  createdAt: Date
}

export interface SearchParams {
  page: string
}

export type PaginationPages = number[]

export interface MembersAndPagination {
  data: MembersDb[]
  paginationPages: PaginationPages
}
