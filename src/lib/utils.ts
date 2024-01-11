import { type ReadonlyURLSearchParams } from 'next/navigation'

export const createQueryParams = (searchParams: ReadonlyURLSearchParams, paramName: string, paramValue: string): string => {
  const params = new URLSearchParams(searchParams)
  params.set(paramName, paramValue)
  return params.toString()
}
