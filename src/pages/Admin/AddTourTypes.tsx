import { AddTourTypeModal } from "@/components/modules/admin/tourType/AddTourTypeModal"
import { UpdateTourTypeModal } from "@/components/modules/admin/tourType/UpdateTourTypeModal"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDeleteTourTypeMutation, useGetTourTypeQuery } from "@/redux/features/tour/tour.api"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AddTourTypes() {
  const { data } = useGetTourTypeQuery(undefined)
  const [deleteTourType] = useDeleteTourTypeMutation()

  const handleTourTypeDelete = (tourTypeId: string) => {
    toast("Are you sure you want to delete this tour type?", {
      action: {
        label: "Yes, Delete",
        onClick: async () => {
          const res = await deleteTourType(tourTypeId).unwrap()
          if (res.success) {
            toast.success("tour type deleted successfully")
          }
        }
      }
    })

  }


  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { name: string, _id: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">{item?.name}</TableCell>
                <TableCell><Button onClick={() => handleTourTypeDelete(item._id)} size="sm"><Trash2 /></Button></TableCell>
                <TableCell><UpdateTourTypeModal tourTypeId={item._id} defaultName={item.name}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
