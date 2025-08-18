import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/admin/division/AddDivisionModal";
import { UpdateDivisionModal } from "@/components/modules/admin/division/UpdateDivisionModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteDivisionMutation, useGetDivisionQuery } from "@/redux/features/division/division.api";
import { Trash2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";


export default function AddDivision() {
  const {data} = useGetDivisionQuery(undefined)
   const [deleteDivision] = useDeleteDivisionMutation()


  const handleDivisionDelete = async(divisionId: string) => {
      const toastId = toast.loading("removing....")
           try {
             const res = await deleteDivision(divisionId).unwrap()
            if (res.success) {
              toast.success("division deleted successfully", {id :toastId}  )
            }
            
           } catch (error) {
            console.error(error)
           }
          
    }


  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddDivisionModal />
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
            {data?.data?.map((item: { name: string, _id: string,slug :string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full"><Link  to={`/admin/division/${item.slug}`}>{item?.name}</Link></TableCell>
                <TableCell>
                  <DeleteConfirmation onConfirm={() => handleDivisionDelete(item._id)}>
                    <Button size="sm"><Trash2 /></Button>
                  </DeleteConfirmation>
                </TableCell>
                <TableCell><UpdateDivisionModal divisionId={item._id} defaultName={item.name} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
