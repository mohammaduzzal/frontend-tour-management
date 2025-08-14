
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUpdateTourTypeMutation } from "@/redux/features/tour/tour.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

interface UpdateTourTypeModalProps {
  tourTypeId: string;
  defaultName: string;
}


const tourTypeSchema = z.object({
    name: z.string()
})


export function UpdateTourTypeModal({tourTypeId,defaultName} : UpdateTourTypeModalProps) {
    const form = useForm<z.infer<typeof tourTypeSchema>>({
        resolver: zodResolver(tourTypeSchema),
        defaultValues: {
            name: defaultName ||""
        }
    })

    const [open, setOpen] = useState(false)
    const [updateTourType] = useUpdateTourTypeMutation()




    const onSubmit = async (formData: z.infer<typeof tourTypeSchema>) => {
        
        const res =await updateTourType({tourTypeId, payload: {name : formData.name}}).unwrap()
        if(res.success){
            toast.success("tour type updated successfully")
            setOpen(false)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button size="sm"><Pencil /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Tour Type</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="type-id" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="tour type name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="type-id" type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
