import { DataTable } from '@/app/components/data-table.component'
import { modelsColumn } from './columns.helpers'

export default function ModulesDataTable({data}:{data:any}) {
  return <DataTable columns={modelsColumn} data={data}  />
}
