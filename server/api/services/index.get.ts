export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log("query:", query)
    if (query.tags){
        // call tags api 
        console.log("tags query:", query.tags)
      try{
        const response = await $fetch(`/api/services/tags/${query.tags}`)
        console.log("response:", response)
       return response
       
      } catch (error){
        console.error(error)
          
      }      
    } else{
          const services = await prisma.services.findMany({
            select: {
                name: true,
                description: true,
                category: true,                
                service_tags: {
                    select: {
                        tags: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        })

       const transformedServices = services.map((service) => ({
        name: service.name,
        description: service.description,
        category: service.category.name,
         tags: service.service_tags.map(
           (tagOnService) => tagOnService.tags.name
         ),
       }))

       return transformedServices}
})