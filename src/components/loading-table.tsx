export default function LoadingTable (): JSX.Element {
  return (
    <main className="flex flex-col flex-1 px-8 py-4 max-lg:mt-20">
      <span className="rounded-full mt-4 mb-8 w-40 py-3 skeleton-loader"></span>
      <section className="py-4">
        <div className='flex items-center gap-4'>
          <form className='flex-1'>
            <div className="flex">
              <div className="relative z-10 w-full">
                <div className='w-full h-fit relative z-10'>
                <span className="block py-6 w-full rounded-lg skeleton-loader"></span>
              </div>
              </div>
            </div>
          </form>
          <div className='skeleton-loader rounded-lg px-7 py-6'></div>
        </div>
        <div className='flex flex-col flex-1 py-4 w-full'>
          <span className="mt-4 mb-8"></span>
          <div className="relative z-10 my-6">
            <table className="w-full">
              <tbody className='skeleton-loader'>
                <tr className="border-b text-black">
                  <td className="p-6"></td>
                  <th scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></th>
                  <td scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td scope="row" className='flex gap-2 items-center pe-4'></td>
                </tr>
                <tr className="border-b text-black">
                  <td className="p-6"></td>
                  <th scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></th>
                  <td scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td scope="row" className='flex gap-2 items-center pe-4'></td>
                </tr>
                <tr className="border-b text-black">
                  <td className="p-6"></td>
                  <th scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></th>
                  <td scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td scope="row" className='flex gap-2 items-center pe-4'></td>
                </tr>
                <tr className="border-b text-black">
                  <td className="p-6"></td>
                  <th scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></th>
                  <td scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td scope="row" className='flex gap-2 items-center pe-4'></td>
                </tr>
                <tr className="border-b text-black">
                  <td className="p-6"></td>
                  <th scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></th>
                  <td scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td scope="row" className='flex gap-2 items-center pe-4'></td>
                </tr>
                <tr className="border-b text-black">
                  <td className="p-6"></td>
                  <th scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></th>
                  <td scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td scope="row" className='flex gap-2 items-center pe-4'></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center h-8 text-sm">
            <span className='items-center justify-center mx-1 px-4 h-8 leading-tight rounded-lg skeleton-loader'></span>
            <span className='items-center justify-center mx-1 px-4 h-8 leading-tight rounded-lg skeleton-loader'></span>
            <span className='items-center justify-center mx-1 px-4 h-8 leading-tight rounded-lg skeleton-loader'></span>
          </div>
        </div>
      </section>
    </main>
  )
}
