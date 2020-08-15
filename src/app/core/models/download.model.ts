export interface Download {
  _id: string
  downloadUrl: string
  downloadUrls: any
  transactionId: string
  item: Item
}

interface Item {
  description: string
  thumbnail: string
  meta: object
  slug: string
  title_bn: string
  title_en: string
}
