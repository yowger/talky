import { z } from "zod"

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10
const MAX_PAGE_SIZE = 50

export const paginationSchema = z.object({
    page: z.preprocess(
        (val) => (val === undefined ? DEFAULT_PAGE : Number(val)),
        z.number().min(DEFAULT_PAGE).default(DEFAULT_PAGE)
    ),
    pageSize: z.preprocess(
        (val) => (val === undefined ? DEFAULT_PAGE_SIZE : Number(val)),
        z.number().min(10).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE)
    ),
})
