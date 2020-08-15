export interface ItemData {
    type: string
    title?: Title
    subtitle?: string
    media?: Content[]
    questions?: Questions[]
    result?: Result
    cta?: Cta
    reviews?: Reviews[]
}

interface Title {
    text: string
    option?: Option
}

interface Option {
    text_color?: string
    bg_color?: string
    img_url?: string
}

interface Questions {
    title: string
}

interface Reviews {
    author?: string
    content: string
}

interface Result {
    text: string
    progress_color?: string
    score: number
    total: number
}

interface Cta {
    id?: string
    title: Title
    subtitle?: Title
    is_price?: boolean
}

interface Content {
    type: string
    img_url?: string
    content?: string
    video_url?: string
}

enum ContentType {
    image,
    rich_content
}
enum ItemType {
    regular,
    interactive,
    reviews
}

// [
//     {
//         type: 'regular',
//         title: {
//             text: "ঘরে বসেই নিজের Spoken English ভালো করার ৬০টি কার্যকরী ফর্মুলা নিয়ে তৈরি করা এই বই",
//             option: { text_color: '#33333', bg_color: '#FFFFFF', use_color: true, img_url: 'imgurl', use_img: false }
//         },
//         img: [{ position: left, url: xxx, alt: yyy, display: true }, { position: left, url: 'imgurl', alt: 'img', display: false }, { position: left, url: xxx, alt: yyy, display: false }],
//         rich_content: [
//             { position: left, content: "", display: true },
//             { position: left, content: "    ", display: false },
//             { position: left, content: "    ", display: false }
//         ],
//         cta: { button_id: 123, text: "downlaod korun", subtext: "jitben naki harben, apnar bepar", display: true }
//     },
//     {
//         type: 'interactive',
//         title: {
//             text: "dekho tomar ki obostha",
//             option: { text_color: '#33333', bg_color: '#FFFFFF', use_color: true, img_url: 'imgurl', use_img: false }
//         },
//         questions: [
//             { order_idx: 0, question: "whatsup?" },
//             { order_idx: 0, question: "whatsup?" },
//             { order_idx: 0, question: "whatsup?" },
//         ],
//         results: {
//             text: "apnar mullo",
//             bar_color: '#333333'
//         },
//         cta: {
//             button_id: 123,
//             text: "downlaod korun",
//             subtext: "jitben naki harben, apnar bepar"
//         }
//     },
//     {
//         type: 'review',
//         title: "Review gula poro",
//         title_bg: { text_color: '#33333', bg_color: '#ffffff', use_color: true, img_url: 'imgurl', use_img: false },
//         reviews: [
//             { order_idx: 0, content: "whatsup?", author: 'fahad' },
//             { order_idx: 0, content: "whatsup?", author: 'fahad' },
//             { order_idx: 0, content: "whatsup?", author: 'fahad' }
//         ],
//         cta: {
//             button_id: 123,
//             text: "downlaod korun",
//             subtext: "jitben naki harben, apnar bepar"
//         }
//     }
// ]