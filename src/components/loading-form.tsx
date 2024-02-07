// Constants
import { TYPE_FORM_LOADING } from '@/constants/constants'

export default function LoadingForm ({ type }: { type: string }): JSX.Element {
  const loadingsLengths = TYPE_FORM_LOADING.find((loading) => loading.type === type)?.length
  const loadings = Array(loadingsLengths).fill(0)

  return (
    <div className='flex flex-col gap-2'>
      {
        loadings.map((_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <span className="skeleton-loader block mt-4 w-40 py-2 rounded-full"></span>
            <span className="skeleton-loader w-full border-gray-300 rounded-md shadow-md py-6 px-2" />
          </div>
        ))
      }
      <span className='skeleton-loader w-full h-12 rounded-md mt-4'></span>
    </div>
  )
}
