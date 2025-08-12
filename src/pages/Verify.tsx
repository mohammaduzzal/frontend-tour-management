import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import { useSendOptMutation, useVerifyOptMutation } from "@/redux/features/auth/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dot } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function Verify() {
  const location = useLocation()
  const [email] = useState(location.state)
  const navigate = useNavigate()
  const [confirm, setConfirm] = useState(false)
  const [sendOtp] = useSendOptMutation()
  const [verifyOtp] = useVerifyOptMutation()
  const [timer, setTimer] = useState(120)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })


  const handleSentOtp = async () => {
    const toastId = toast.loading("sending OTP")

    try {
      const res = await sendOtp({ email: email }).unwrap()

      if (res.success) {
        toast.success("OTP sent", { id: toastId })
        setConfirm(true)
        setTimer(120)

      }


    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("verifying OTP")
    const userInfo = {
      email,
      otp: data.pin
    }

    try {
      const res = await verifyOtp(userInfo).unwrap()

      if (res.success) {
        toast.success("OTP verified", { id: toastId })
      }

    } catch (error) {
      console.log(error)
    }
  }



  // useEffect(() => {
  //   if (!email) {
  //     navigate("/")
  //   }
  // }, [email])
  // console.log(location.state)


  useEffect(() => {
    if (!email || !confirm) {
      return
    }

    const timerId = setInterval(() => {
      if (email && confirm) {
        setTimer((pre) => (pre > 0 ? pre - 1 : 0))
        console.log("tik tok")
      }
    }, 1000)
    return () => clearInterval(timerId)
  }, [email, confirm])


  return (
    <div className="grid place-content-center h-screen">
      {
        confirm ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Verify your email address</CardTitle>
              <CardDescription>Please enter the 6 digit code we sent to <br />{email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <Dot />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>
                          <Button className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0
                          })}
                            type="button"
                            onClick={handleSentOtp}
                            disabled={timer !== 0}
                            variant="link">Resent OTP : {" "}
                          </Button>{" "}
                          {timer}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button form="otp-form" type="submit">Submit</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Verify your email address</CardTitle>
              <CardDescription>We will send you an OTP at <br />{email}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-end">
              <Button onClick={handleSentOtp} className="w-[300px]" type="submit">Confirm</Button>
            </CardFooter>


          </Card>
        )
      }



    </div>
  )
}
