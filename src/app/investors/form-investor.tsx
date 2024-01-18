'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Constants
import { API_URL, MSG_ADDING, MSG_EDITING } from '@/constants/constants'

// Types
import { type InvestorsHistoryDb, type InvestorsDb } from '@/types/types'

export default function FormInvestor ({ investorId = null }: { investorId?: string | null }): JSX.Element {
  const [isSending, setIsSending] = useState('')
  const [investor, setInvetor] = useState({ photo: '', name: '', amount: 0, investedIn: '', amountByDate: 0 })
  const [amountList, setAmountList] = useState()
  const [amountByDateSelected, setAmountByDateSelected] = useState(0)
  const [dateList, setDateList] = useState([])
  const router = useRouter()
  const textBtn = investorId === null ? 'Add' : 'Edit'

  useEffect(() => {
    if (investorId !== null) {
      const getMember = async (): Promise<void> => {
        const res = await fetch(`${API_URL}/investors/${investorId}`, { cache: 'no-cache' })
        const data: InvestorsDb[] | InvestorsHistoryDb[] = await res.json()

        console.log('data', data)
        const { investorsHistory } = data
        // const totalAmount = investorsHistory?.reduce((acc, curr) => acc + curr.amount, 0)
        const amounts = investorsHistory?.map(eachAmount => eachAmount?.amount)
        const historyData: Array<{ id: number, amount: number, investedIn: string }> = investorsHistory?.map((investment: { id: number, amount: number, investedIn: string }) => ({
          id: investment?.id,
          amount: investment?.amount,
          investedIn: investment?.investedIn.split('T')[0]
        }))

        setAmountList(amounts)
        setDateList(historyData)
        const { amountSelected, dateSelected } = amountAndDateSelected(historyData[historyData.length -1]?.id, historyData)
        setInvetor({ ...data, amount: amountSelected, investedIn: dateSelected, amountByDate: historyData[historyData.length -1]?.id })
      }

      void getMember()
    }
  }, [investorId])

  // useEffect(() => {
  //   console.log('investorId', investorId)
  // }, [investor.amount])

  useEffect(() => {
    console.log('investor', investor)
    console.log('dateList', dateList)
    console.log('XXXXXXXXXXXXXXXXXXXXX', investor?.amount)
    // console.log('dateList?.find(investment => investment.amount === investor?.amount)?.investedIn', dateList?.find(investment => investment.amount == investor?.amount).investedIn)
  }, [investor])

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    if (name === 'amountByDate') {
      const { amountSelected, dateSelected } = amountAndDateSelected(Number(value), dateList)
      setInvetor({ ...investor, investedIn: dateSelected, amount: amountSelected, amountByDate: Number(value) })
      return
    }
    console.log('amountByDateSelected', amountByDateSelected)
    setInvetor({
      ...investor,
      [name]: value
    })
  }

  const amountAndDateSelected = (id: number, dataProp: []): { amountSelected: number, dateSelected: string } => {
    const amountSelected = dataProp?.find(investment => investment.id === Number(id))?.amount

    console.log('dataProp', dataProp)

    const dateSelected = dataProp?.find(investment => investment.id === Number(id))?.investedIn
    return { amountSelected, dateSelected }
  }

  const handleSubmitInvestors = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      ...Object.fromEntries(formData),
      photo: '',
      investedIn: new Date(Object.fromEntries(formData).investedIn).toISOString(),
      amount: Number(Object.fromEntries(formData).amount)
    }
    console.log('data', data)
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
      console.log('data', data)
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
    <form onSubmit={(e) => { void handleSubmitInvestors(e) }}>
      <label htmlFor="photo" className="block text-lg font-medium">Photo</label>
      {/* <input type="file" name="photo" id="photo" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" /> */}
      <label htmlFor="name" className="block text-lg font-medium">Name</label>
      <input onChange={handleChangeValues} type="text" name="name" placeholder='Type name' id="name" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={investor?.name} />
      <label htmlFor="amountByDate" className="block text-lg font-medium">Amount By Date</label>
      <select onChange={handleChangeValues} name="amountByDate" id="amountByDate" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={investor?.amountByDate}>
        {
          dateList?.map((item, index) => (
            <option key={index} value={item.id}>{item.amount}-({item.investedIn})</option>
          ))
        }
      </select>
      <label htmlFor="amount" className="block text-lg font-medium">Amount</label>
      <input onChange={handleChangeValues} type='number' name="amount" id="amount" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={investor.amount} />
      <label htmlFor="investedIn" className="block text-lg font-medium">Invested in</label>
      <input onChange={handleChangeValues} type="date" name="investedIn" placeholder='Type investedIn' id="investedIn" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={investor.investedIn} />
      <button className={`w-full h-12 ${isSending === '' ? 'bg-indigo-500' : 'bg-indigo-300'} hover:bg-indigo-300 text-white rounded-md text-lg font-medium mt-4`}>{isSending === '' ? textBtn : isSending}</button>
    </form>
  )
}
