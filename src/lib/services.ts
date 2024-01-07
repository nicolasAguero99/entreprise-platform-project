'use server'
// Constants
import { API_URL, PAGINATION_SLICE_NUMBER } from '@/constants/constants'

// Types
import { type MembersAndPagination, type MembersDb, type PaginationPages } from '@/types/types'

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
  console.log('data', data)
}

export const getMembers = async (): Promise<MembersDb[]> => {
  const res = await fetch(`${API_URL}/members`, { cache: 'no-cache' })
  const data: MembersDb[] = await res.json()
  return data
}

export const getPagesPagination = (data: MembersDb[]): PaginationPages => {
  const paginationLength = Math.ceil(data.length / PAGINATION_SLICE_NUMBER)
  const paginationPages = Array.from(Array(paginationLength).keys())
  return paginationPages
}

export const getMembersAndPages = async (currentPage: number): Promise<MembersAndPagination> => {
  const data = await getMembers()
  const start = currentPage > 1 ? currentPage * PAGINATION_SLICE_NUMBER - PAGINATION_SLICE_NUMBER : 0
  const end = start + PAGINATION_SLICE_NUMBER
  const dataSliced = data.slice(start, end)
  const paginationPages = getPagesPagination(data)
  return { data: dataSliced, paginationPages }
}
