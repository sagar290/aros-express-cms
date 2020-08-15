export interface Item {
  discount: boolean
  in_stock: boolean
  price: Price
  thumbnail: string
  description: string
  title_en: string
  title_bn: string
  meta: object
  _id: string
  slug: string
  already_purchased: boolean
  cat_id: string
  is_featured: boolean

}

export interface Price {
  regular: number
  discount: number
}

