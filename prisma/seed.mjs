import { PrismaClient } from '@prisma/client'
import { hash } from '@node-rs/argon2'
import { randomBytes } from 'node:crypto'

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
  return await prisma.categories.upsert({
    where: { name },
    update: {},
    create: { name },
  })
}

// Function to create a tag record
async function createTag(name) {
  return await prisma.tags.upsert({
    where: { name },
    update: {},
    create: { name },
  })
}

// Function to create a service record
async function createService(data) {
  const category = await createCategory(data.category)
  const tags = []
  for (const tagName of data.tags) {
    tags.push(await createTag(tagName))
  }

  const existingTags = tags.filter(tag => tag)

  const service = await prisma.services.upsert({
    where: { name: data.name },
    update: {},
    create: {
      name: data.name,
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

// Loop sequentially through data
const created = []
for (const item of data) {
  created.push(await createService(item))
}

const passwordHash = await hash('KuneOwner123!', {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
})
const buyerHash = await hash('KuneBuyer123!', {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
})
const adminHash = await hash('KuneAdmin123!', {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
})

await prisma.user.upsert({
  where: { email: 'admin@kune.co.zw' },
  update: { password_hash: adminHash, role: 'ADMIN', emailVerified: new Date() },
  create: {
    email: 'admin@kune.co.zw',
    username: 'kune_admin',
    name: 'Kune Global Admin',
    password_hash: adminHash,
    role: 'ADMIN',
    emailVerified: new Date(),
  },
})

const owner = await prisma.user.upsert({
  where: { email: 'owner@kune.co.zw' },
  update: { password_hash: passwordHash, role: 'SERVICE_OWNER' },
  create: {
    email: 'owner@kune.co.zw',
    username: 'kune_owner',
    name: 'Kune Demo Owner',
    password_hash: passwordHash,
    role: 'SERVICE_OWNER',
  },
})

await prisma.user.upsert({
  where: { email: 'buyer@kune.co.zw' },
  update: { password_hash: buyerHash, role: 'USER' },
  create: {
    email: 'buyer@kune.co.zw',
    username: 'kune_buyer',
    name: 'Kune Demo Buyer',
    password_hash: buyerHash,
    role: 'USER',
  },
})

const featuredNames = ['Classifieds', 'TopUp', 'Fresh in a Box']
for (const service of created) {
  const featured = featuredNames.includes(service.name)
  await prisma.services.update({
    where: { id: service.id },
    data: {
      service_owner_id: featured || service.name === 'Enbee' ? owner.id : service.service_owner_id,
      featured,
    },
  })
}

const owned = await prisma.services.findMany({
  where: { service_owner_id: owner.id },
})

async function upsertDeal(title, service, original, price) {
  const existing = await prisma.deal.findFirst({ where: { title, service_id: service.id } })
  if (existing)
    return existing
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}-${randomBytes(3).toString('hex')}`
  const starts = new Date()
  const ends = new Date()
  ends.setDate(ends.getDate() + 21)
  return prisma.deal.create({
    data: {
      slug,
      service_id: service.id,
      owner_id: owner.id,
      title,
      description: `Limited-time coupon from ${service.name}. Buy a voucher on Kune and redeem it with the business.`,
      original_price: original,
      deal_price: price,
      quantity_total: 40,
      min_buyers: 3,
      starts_at: starts,
      ends_at: ends,
      status: 'active',
      redemption_instructions: `Show your Kune voucher code at ${service.name} to redeem this deal.`,
      terms: 'One voucher per customer. Valid during the deal window.',
    },
  })
}

const classifieds = owned.find(s => s.name === 'Classifieds')
const topup = owned.find(s => s.name === 'TopUp')
if (classifieds)
  await upsertDeal('Half-price featured listing boost', classifieds, 40, 20)
if (topup)
  await upsertDeal('$5 airtime top-up for $3', topup, 5, 3)

console.log('Database seeding completed!')
console.log('Demo admin: admin@kune.co.zw / KuneAdmin123!')
console.log('Demo owner: owner@kune.co.zw / KuneOwner123!')
console.log('Demo buyer: buyer@kune.co.zw / KuneBuyer123!')
await prisma.$disconnect()
