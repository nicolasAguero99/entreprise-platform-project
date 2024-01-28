'use server'
// Constants
import { API_URL, PAGINATION_SLICE_NUMBER } from '@/constants/constants'

// Types
import { type MembersAndPagination, type BalanceAndPagination, type MembersDb, type PaginationPages, OrderTypes, type InvestorsDb, type InvestorsHistoryDb, type InvestorsAndPagination, type BalanceDb } from '@/types/types.d'
import { boolean } from 'zod'

export async function addMember (e: React.FormEvent<HTMLFormElement>): Promise<void> {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
  await fetch(`${API_URL}/members`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getMembers = async (): Promise<MembersDb[]> => {
  const res = await fetch(`${API_URL}/members`, { cache: 'no-cache' })
  const data: MembersDb[] = await res.json()
  return data
}

export const getInvestors = async (): Promise<InvestorsDb[]> => {
  const res = await fetch(`${API_URL}/investors`, { cache: 'no-cache' })
  const data: InvestorsDb[] = await res.json()
  return data
}

export const getBalance = async (): Promise<BalanceDb[]> => {
  const res = await fetch(`${API_URL}/balance`, { cache: 'no-cache' })
  const data: BalanceDb[] = await res.json()
  return data
}

export const getInvestorsHistory = async (): Promise<InvestorsHistoryDb[]> => {
  const res = await fetch(`${API_URL}/investors/history`, { cache: 'no-cache' })
  const data: InvestorsHistoryDb[] = await res.json()
  return data
}

export const getInvestorsWithHistory = async (): Promise<InvestorsHistoryDb[]> => {
  const res = await fetch(`${API_URL}/investors/history`, { cache: 'no-cache' })
  const data: InvestorsHistoryDb[] = await res.json()
  return data
}

export const getMembersByName = async (searchValue: string): Promise<MembersDb[]> => {
  const data = await getMembers()
  const dataFiltered = data.filter((member) => removeAccents(member.name.toLocaleLowerCase()).includes(removeAccents(searchValue.toLocaleLowerCase())))
  return dataFiltered
}

export const getInvestorsByName = async (searchValue: string): Promise<InvestorsDb[]> => {
  const data = await getInvestors()

  console.log('data', data)

  const dataFiltered = data.filter((investor) => {
    console.log('investor.name', investor.name)
    return removeAccents(investor.name.toLocaleLowerCase()).includes(removeAccents(searchValue.toLocaleLowerCase()))
  })
  return dataFiltered
}

export const getBalanceByName = async (searchValue: string): Promise<BalanceDb[]> => {
  const data = await getBalance()
  const dataFiltered = data.filter((balance) => {
    return removeAccents(balance.action.toLocaleLowerCase()).includes(removeAccents(searchValue.toLocaleLowerCase()))
  })
  return dataFiltered
}

export const getPagesPagination = (data: any): PaginationPages => {
  const paginationLength = Math.ceil(data.length / PAGINATION_SLICE_NUMBER)
  const paginationPages = Array.from(Array(paginationLength).keys())
  return paginationPages
}

export const getDataSorted = async (data: any, orderBy: string): Promise<any> => {
  const { DATE_ORDER, NAME_ORDER } = OrderTypes
  // const data = await getMembers()
  let dataSorted: MembersDb[] | InvestorsDb[] | BalanceDb[] | [] = []
  if (orderBy === DATE_ORDER) {
    dataSorted = data.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })
  } else if (orderBy === NAME_ORDER) {
    dataSorted = data.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      return nameA.localeCompare(nameB)
    })
  } else {
    dataSorted = data
  }
  return dataSorted
}

export const getMembersAndPages = async (searchValue: string, currentPage: number, orderBy: OrderTypes | string): Promise<MembersAndPagination> => {
  // const data = await getMembers()
  const data = await getMembersByName(searchValue)
  const dataSorted = await getDataSorted(data, orderBy)
  const start = currentPage > 1 ? currentPage * PAGINATION_SLICE_NUMBER - PAGINATION_SLICE_NUMBER : 0
  const end = start + PAGINATION_SLICE_NUMBER
  const dataSliced = dataSorted.slice(start, end)
  const paginationPages = getPagesPagination(data)
  const prev = currentPage > 1 ? currentPage - 1 : 1
  const next = currentPage < paginationPages.length ? currentPage + 1 : paginationPages.length
  return { data: dataSliced, paginationPages, prev, next }
}

export const getInvestorsAndPages = async (searchValue: string, currentPage: number, orderBy: OrderTypes | string): Promise<InvestorsAndPagination> => {
  // const data = await getMembers()
  const data = await getInvestorsByName(searchValue)
  const dataSorted = await getDataSorted(data, orderBy)
  const start = currentPage > 1 ? currentPage * PAGINATION_SLICE_NUMBER - PAGINATION_SLICE_NUMBER : 0
  const end = start + PAGINATION_SLICE_NUMBER
  const dataSliced = dataSorted.slice(start, end)
  const paginationPages = getPagesPagination(data)
  const prev = currentPage > 1 ? currentPage - 1 : 1
  const next = currentPage < paginationPages.length ? currentPage + 1 : paginationPages.length
  return { data: dataSliced, paginationPages, prev, next }
}

export const getBalanceAndPages = async (searchValue: string, currentPage: number, orderBy: OrderTypes | string): Promise<BalanceAndPagination> => {
  // const data = await getMembers()
  const data = await getBalanceByName(searchValue)
  const dataSorted = await getDataSorted(data, orderBy)
  const start = currentPage > 1 ? currentPage * PAGINATION_SLICE_NUMBER - PAGINATION_SLICE_NUMBER : 0
  const end = start + PAGINATION_SLICE_NUMBER
  const dataSliced = dataSorted.slice(start, end)
  const paginationPages = getPagesPagination(data)
  const prev = currentPage > 1 ? currentPage - 1 : 1
  const next = currentPage < paginationPages.length ? currentPage + 1 : paginationPages.length
  return { data: dataSliced, paginationPages, prev, next }
}

export const removeAccents = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const getStatesPaidsMembers = async (): Promise<Array<{ paid: boolean }>> => {
  const res = await fetch(`${API_URL}/invoices/paids`, { cache: 'no-cache' })
  const data: Array<{ paid: boolean }> = await res.json()
  return data
}

export const getInvestmentsByMonth = async (): Promise<number[]> => {
  const res = await fetch(`${API_URL}/investors/investments`, { cache: 'no-cache' })
  const data: number[] = await res.json()
  return data
}

export const getProfitable = async (): Promise<number[]> => {
  const res = await fetch(`${API_URL}/balance/profitable`, { cache: 'no-cache' })
  const data: number[] = await res.json()
  return data
}

export const getBalanceAmounts = async (): Promise<Array<{ amount: number }>> => {
  const res = await fetch(`${API_URL}/balance/amounts`, { cache: 'no-cache' })
  const data: Array<{ amount: number }> = await res.json()
  return data
}
