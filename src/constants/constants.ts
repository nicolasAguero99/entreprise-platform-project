export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`

export const SIDEBAR_LINKS = [
  {
    name: 'Dashboard',
    path: '/'
  },
  {
    name: 'Invoices',
    path: '/invoices'
  },
  {
    name: 'Investors',
    path: '/investors'
  },
  {
    name: 'Members',
    path: '/members'
  },
  {
    name: 'Balance',
    path: '/balance'
  }
]

export const MSG_ADDING = 'Adding...'
export const MSG_EDITING = 'Editing...'
export const PAGINATION_SLICE_NUMBER = 5
export const MONTHS = [
  { value: 0, name: 'No filter' },
  { value: 1, name: 'January' },
  { value: 2, name: 'February' },
  { value: 3, name: 'March' },
  { value: 4, name: 'April' },
  { value: 5, name: 'May' },
  { value: 6, name: 'June' },
  { value: 7, name: 'July' },
  { value: 8, name: 'August' },
  { value: 9, name: 'September' },
  { value: 10, name: 'October' },
  { value: 11, name: 'November' },
  { value: 12, name: 'December' }
]

export const TABS_BALANCE = [
  { name: 'Total', value: 'total' },
  { name: 'Income', value: 'income' },
  { name: 'Expenses', value: 'expenses' }
]

export const TITLES_CARDS_HEADER = [
  { type: 'balanceTotal', title: 'Total balance' },
  { type: 'latestInvestment', title: 'Last investment' },
  { type: 'latestAction', title: 'Last action' }
]

export const TEXT_TABLE_DATE = ['Date', 'Invested In']

export const COLORS_CHART = ['#275DAD', '#347FEE']
