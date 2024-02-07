'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Constants
import { API_URL, MSG_ADDING, MSG_EDITING, TYPE_FORM_LOADING } from '@/constants/constants'

// Components
import LoadingForm from '../loading-form'

// Types
import { type InvestorsDb } from '@/types/types'

export default function FormInvestor ({ investorId = null }: { investorId?: string | null }): JSX.Element {
  const [isSending, setIsSending] = useState('')
  const [investor, setInvetor] = useState<{ photo: string, name: string, amount: number | undefined, investedIn: string | undefined, amountByDate: number }>({ photo: '', name: '', amount: 0, investedIn: '', amountByDate: 0 })
  const [dateList, setDateList] = useState<Array<{ id: number, amount: number, investedIn: string }>>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const textBtn = investorId === null ? 'Add' : 'Edit'

  useEffect(() => {
    if (investorId !== null) {
      const getMember = async (): Promise<void> => {
        const res = await fetch(`${API_URL}/investors/${investorId}`, { cache: 'no-cache' })
        const data: InvestorsDb = await res.json()
        const { investorsHistory } = data
        const historyData = investorsHistory?.map((investment) => ({
          id: investment?.id,
          amount: investment?.amount,
          investedIn: investment?.investedIn.split('T')[0]
        }))
        setDateList(historyData)
        const { amountSelected, dateSelected } = amountAndDateSelected(historyData[historyData.length - 1]?.id, historyData)
        setInvetor({ ...data, amount: amountSelected, investedIn: dateSelected, amountByDate: historyData[historyData.length - 1]?.id })
        setLoading(false)
      }

      void getMember()
    }
  }, [investorId])

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    if (name === 'amountByDate') {
      const { amountSelected, dateSelected } = amountAndDateSelected(Number(value), dateList)
      setInvetor({ ...investor, investedIn: dateSelected, amount: amountSelected, amountByDate: Number(value) })
      return
    }
    setInvetor({
      ...investor,
      [name]: value
    })
  }

  const amountAndDateSelected = (id: number, dataProp: Array<{ id: number, amount: number, investedIn: string }>): { amountSelected: number | undefined, dateSelected: string | undefined } => {
    const selectedInvestment = dataProp.find(investment => investment.id === Number(id))
    const amountSelected = selectedInvestment?.amount
    const dateSelected = selectedInvestment?.investedIn
    return { amountSelected, dateSelected }
  }

  const handleSubmitInvestors = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      ...Object.fromEntries(formData),
      photo: '',
      idHistory: Number(Object.fromEntries(formData).amountByDate),
      investedIn: new Date(String(Object.fromEntries(formData).investedIn)).toISOString(),
      amount: Number(Object.fromEntries(formData).amount)
    }
    setIsSending(MSG_ADDING)
    let res = null

    if (investorId === null) {
      res = await fetch(`${API_URL}/investors`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      setIsSending(MSG_EDITING)
      res = await fetch(`${API_URL}/investors/${investorId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    if (res.ok) {
      router.push('/investors')
      router.refresh()
    } else {
      console.log('error')
    }
  }

  return (
    <>
      {
        loading
          ? <LoadingForm type={TYPE_FORM_LOADING[1].type} />
          : <form onSubmit={(e) => { void handleSubmitInvestors(e) }} className='flex flex-col gap-2'>
              <label htmlFor="name" className="block text-lg font-medium">Name</label>
              <input onChange={handleChangeValues} type="text" name="name" placeholder='Type name' id="name" className="w-full border-gray-300 rounded-md shadow-md py-1 px-2" value={investor?.name} />
              {
                investorId !== null &&
                <>
                  <label htmlFor="amountByDate" className="block text-lg font-medium">Amount By Date</label>
                  <select onChange={handleChangeValues} name="amountByDate" id="amountByDate" className="w-full border-gray-300 rounded-md shadow-md py-1 px-2" value={investor?.amountByDate}>
                    {
                      dateList?.map((item, index) => (
                        <option key={index} value={item.id}>{item.amount}-({item.investedIn})</option>
                      ))
                    }
                  </select>
                </>
              }
              <label htmlFor="amount" className="block text-lg font-medium">Amount</label>
              <input onChange={handleChangeValues} type='number' name="amount" id="amount" className="w-full border-gray-300 rounded-md shadow-md py-1 px-2" value={investor.amount} />
              <label htmlFor="investedIn" className="block text-lg font-medium">Invested in</label>
              <input onChange={handleChangeValues} type="date" name="investedIn" placeholder='Type investedIn' id="investedIn" className="w-full border-gray-300 rounded-md shadow-md py-1 px-2" value={investor.investedIn} />
              <button className={`w-full h-12 ${isSending === '' ? 'bg-background' : 'bg-background/50'} hover:bg-background/80 text-white rounded-md text-lg font-medium mt-4`}>{isSending === '' ? textBtn : isSending}</button>
            </form>
      }
    </>
  )
}
