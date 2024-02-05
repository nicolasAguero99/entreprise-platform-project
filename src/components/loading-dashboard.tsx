export default function LoadingDashboard (): JSX.Element {
  return (
    <div className="w-full flex flex-col gap-6 px-8 py-4 max-lg:mt-20">
      <span className="rounded-full mt-4 mb-8 w-40 py-3 skeleton-loader"></span>
      <div className="flex max-md:flex-col gap-4">
        <div className="w-full h-20 rounded-lg skeleton-loader"></div>
        <div className="w-full h-20 rounded-lg skeleton-loader"></div>
        <div className="w-full h-20 rounded-lg skeleton-loader"></div>
      </div>
      <div className="w-full h-[500px] rounded-lg skeleton-loader"></div>
      <div className="flex gap-4 max-xl:flex-col">
        <div className='w-full h-48 rounded-lg skeleton-loader'></div>
        <div className='w-full h-48 rounded-lg skeleton-loader'></div>
      </div>
    </div>
  )
}
