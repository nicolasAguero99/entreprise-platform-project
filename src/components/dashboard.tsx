export default function Dashboard (): JSX.Element {
  return (
    <main className="w-full">
      <div className="flex flex-col gap-4">
        <section className="flex gap-4 justify-center items-center">
          <div className="flex flex-1 flex-col gap-2 p-4 bg-slate-200 text-black rounded-md">
            <span className="font-semibold text-xl">Info. Card</span>
            <span>details...</span>
            <small className="text-green-7000">+25%</small>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4 bg-slate-200 text-black rounded-md">
            <span className="font-semibold text-xl">Info. Card</span>
            <span>details...</span>
            <small className="text-green-7000">+25%</small>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4 bg-slate-200 text-black rounded-md">
            <span className="font-semibold text-xl">Info. Card</span>
            <span>details...</span>
            <small className="text-green-7000">+25%</small>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">ff</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div className="bg-gray-200">Users</div>
            <div className="bg-gray-200">Data</div>
            <div className="bg-gray-200">Data</div>
          </div>
        </section>
      </div>
    </main>
  )
}
