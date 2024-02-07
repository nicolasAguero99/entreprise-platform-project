// Constantst
import { TYPE_FORM_LOADING } from '@/constants/constants'

// Components
import LoadingForm from '@/components/loading-form'

export default function Loading (): JSX.Element {
  return <LoadingForm type={TYPE_FORM_LOADING[0].type} />
}
