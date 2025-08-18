import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useGetSingleDivisionQuery } from "@/redux/features/division/division.api"
import LoadingSpinner from "@/utils/LoadingSpinner"
import { useParams } from "react-router"

export default function SingleDivisionDetails() {
  const { divisionSlug } = useParams()
  const { data, isLoading, error } = useGetSingleDivisionQuery(divisionSlug)

  if (isLoading) return <LoadingSpinner />
  if (error) return <p>something wrong</p>

  const division = data?.data


  return (
    <div className=" p-6">
      <Card className="shadow-lg border">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-20 h-20 rounded-xl">
            <AvatarImage src={division?.thumbnail} alt={division?.name}/>
            <AvatarFallback>{division?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
           <div>
          <CardTitle className="text-2xl">{division?.name}</CardTitle>
          <CardDescription className="text-muted-foreground">{division?.slug}</CardDescription>
        </div>
        </CardHeader>
        <Separator/>
        <CardContent className="space-y-4 mt-4">
          <p className="text-base">{division?.description}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Badge variant="outline">Division</Badge>
        </CardFooter>
      </Card>

    </div>
  )
}
