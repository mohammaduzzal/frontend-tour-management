import { DeleteConfirmation } from "@/components/DeleteConfirmation"
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

  

  const handleTourTypeDelete = async(tourTypeId: string) => {
    const toastId = toast.loading("removing")
         try {
           const res = await deleteTourType(tourTypeId).unwrap()
          if (res.success) {
            toast.success("tour type deleted successfully", {id :toastId}  )
          }
          
         } catch (error) {
          console.error(error)
         }
        
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
                <TableCell>
                  <DeleteConfirmation  onConfirm={() => handleTourTypeDelete(item._id)}>
                    <Button size="sm"><Trash2 /></Button>
                  </DeleteConfirmation>
                </TableCell>
                <TableCell><UpdateTourTypeModal tourTypeId={item._id} defaultName={item.name}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
