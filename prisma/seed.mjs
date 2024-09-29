import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const data = [
  {
    name: 'Classifieds',
    category: 'Market',
    description: 'This is online market for buying and selling. Mainly cars',
    websiteUrl: ' https://www.classifieds.co.zw/',
    address: 'Some address in Harare',
    tags: ['Market'],
    imgUrl: '/@fs/src/assets/images/classifieds.png',
  },
  {
    name: 'Property.co.zw',
    category: 'Real Estate',
    description: 'This is online market for buying and selling property',
    websiteUrl: 'https://www.property.co.zw/#',
    address: 'Some address in Harare',
    tags: ['Real Estate', 'Property', 'Market'],
    imgUrl: '/@fs/src/assets/images/property.png',
  },
  {
    name: 'TopUp',
    category: 'Fintech',
    description:
      'This is website for topping up airtime, data, and other payments',
    websiteUrl: 'https://www.topup.co.zw/',
    address: 'Some address in Harare',
    tags: ['Money', 'Payments', 'Fintech'],
    imgUrl: '/@fs/src/assets/images/topup.png',
  },
  {
    name: 'Webdev',
    category: 'Digitalizing',
    description: 'This is an online solutions form websites and such and such',
    websiteUrl: 'https://www.webdev.co.zw/',
    address: 'Some address in Harare',
    tags: ['Web Development'],
    imgUrl: '/@fs/src/assets/images/webdev.png',
  },
  {
    name: 'Sprout Women',
    category: 'NGO',
    description: 'Womens rights and empowerment NGO',
    websiteUrl: 'https://www.sproutwomenempowermenttrust.co.zw/',
    address: 'Some address in Harare',
    tags: ['Women', 'NGO'],
    imgUrl: '/@fs/src/assets/images/swet.png',
  },
  {
    name: 'Enbee',
    category: 'Clothing Store',
    description: 'School uniform store ',
    websiteUrl: 'https://www.enbee.co.zw/',
    address: 'Some address in Harare',
    tags: ['School', 'Uniforms', 'Clothing', 'Store'],
    imgUrl: '/@fs/src/assets/images/enbee.png',
  },
  {
    name: 'Startup Biz',
    category: 'Business',
    description: 'StartupBiz Zimbabwe is a business research firm based in Zimbabwe. We are passionate about entrepreneurship. ',
    websiteUrl: 'https://www.startupbiz.co.zw/',
    address: 'Some address in Harare',
    tags: ['Business', 'Start-up'],
    imgUrl: '/@fs/src/assets/images/startupbiz.png',
  },
  {
    name: 'Tech Zim',
    category: 'Business',
    description:
      'Techzim is an information technology and business publication that obsesses about the opportunity of tech.',
    websiteUrl: 'https://www.techzim.co.zw/',
    address: 'Some address in Harare',
    tags: ['Business', 'Start-up', 'Tech'],
    imgUrl: '/@fs/src/assets/images/techzim.png',
  },
  {
    name: 'Fresh in a Box',
    category: 'Food',
    description: 'Food delivery and  online shop',
    websiteUrl: 'https://www.freshinabox.co.zw/',
    address: 'Some address in Harare',
    tags: ['Food', 'Delivery'],
    imgUrl: '/@fs/src/assets/images/freshinabox.png',
  },
  {
    name: 'Glamour Gem',
    category: 'Shop',
    description: 'Procurement shop for office, supplies, IT and Uniforms',
    websiteUrl: 'https://www.glamourgem.net/',
    address: '1 Letham Road, Avondale, Harare',
    tags: ['Supplies', 'IT', 'Uniforms'],
    imgUrl: '/@fs/src/assets/images/glamour.png',
  },
  {
    name: 'Trade Kings',
    category: 'Manufacturer',
    description:
      'Trade Kings Zimbabwe are the manufacturers of the Boom and Xtra range of detergent products. ',
    websiteUrl: 'http://www.tkzimbabwe.com/',
    address: ' 10 Douglas Road, Harare',
    tags: ['Industry', 'Manufacturing'],
    imgUrl: '/@fs/src/assets/images/tradek.png',
  },
  {
    name: 'Shift Engage',
    category: 'Media',
    description:
      'Shift Engage is a multi-award winning Creative Advertising Agency specialising in integrated online and offline media. ',
    websiteUrl: 'http://www.shiftengage.net/',
    address: '8 Howard Cl, Harare',
    tags: ['Advertising', 'Branding'],
    imgUrl: '/@fs/src/assets/images/shiftengage.png',
  },
]

// This script assumes you have already created the Prisma schema for your models.

// Function to create a category record
async function createCategory(name) {
  const category = await prisma.categories.findUnique({
    where: { name },
  })

  if (!category) {
    await prisma.categories.create({
      data: {
        name,
      },
    })
  }
  return category
}

// Function to create a tag record
async function createTag(name) {
  const tag = await prisma.tags.findUnique({
    where: { name },
  })

  if (!tag) {
    await prisma.tags.create({
      data: {
        name,
      },
    })
  }
  return tag
}

// Function to create a service record
async function createService(data) {
  const category = await createCategory(data.category)
  const tags = await Promise.all(data.tags.map(createTag))

  // Filter out any null tags (tags that weren't created)
  const existingTags = tags.filter(tag => tag)

  const service = await prisma.services.create({
    data: {
      name: data.name,
      // ... other data
      phone_number: data.phone_number || '',
      address: data.address,
      image_url: data.imgUrl,
      website_url: data.websiteUrl,
      description: data.description,
      category: { connect: { id: category.id } },
      service_tags: {
        create: existingTags.map(tag => ({
          tags: { connect: { id: tag.id } },
        })),
      },
    },
  })
  return service
}

// Loop through your data and create services
await Promise.all(data.map(createService))

// seed()
//   .then(async () => {
//     console.log('Database seeding completed!')
//   })
//   .catch(async (e) => {
//     console.error('Seeding failed:', e.message)
//     await prisma.$disconnect()
//   })
