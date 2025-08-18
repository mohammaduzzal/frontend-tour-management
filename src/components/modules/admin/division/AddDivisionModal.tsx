
import SingleImageUploader from "@/components/SingleImageUploader"
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
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"


const divisionSchema = z.object({
    name: z.string(),
    description: z.string()
})


export function AddDivisionModal() {
    const form = useForm<z.infer<typeof divisionSchema>>({
        resolver: zodResolver(divisionSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const [open, setOpen] = useState(false)
    const [image,setImage] = useState<File | null>(null)
    const [addDivision] = useAddDivisionMutation()




    const onSubmit = async (data: z.infer<typeof divisionSchema>) => {
        const toastId = toast.loading("adding division....")
        const formData = new FormData()

        formData.append("data", JSON.stringify(data))
        formData.append("file", image as File)

    //    console.log(formData.get("data"))
    //    console.log(formData.get("file"))

        try {
             const res=await addDivision(formData).unwrap()

        if (res.success) {
            toast.success("tour type added successfully", {id :toastId})
            setOpen(false)
        }
            
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button>Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Division</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-5" id="division-id" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <SingleImageUploader onChange={setImage}/>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={!image} form="division-id" type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
