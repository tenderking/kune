export default defineEventHandler(async (event) => {
//  add services to favorites
const body = await readBody(event)
const user = event.context.params?.user
if (!user) {
    throw new Error("User not found")
}
console.log(body.serviceId)
const res = await prisma.favorite_services.create({
    data: {
        user_id: user,
        service_id: body.serviceId,
   },
})

return res

})
