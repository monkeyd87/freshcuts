import React from 'react'

export const BasicCard = ({title,data}:{title?:string,data?:string}) => {
  return (
    <div className="flex flex-col flex-1 gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-900">
      <h2 className="text-lg font-semibold">{title ? title : "Default Title"}</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {data ? data : "Default data"}
      </p>
    </div>
  )
}
