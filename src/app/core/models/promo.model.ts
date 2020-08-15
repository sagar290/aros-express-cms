export interface Promo {
    code: string,
    discount_percent: number,
    aff_id: number,
    sku_id: number,
    sku_cat_id: number,
    c_group: string,
    one_time: boolean,
    status: boolean,
    start: string,
    end: string
}
