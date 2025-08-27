import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const books = defineCollection({
    /* Retrieve all book entries from a JSON file. */
    loader: file("src/data/books.json"),
    schema: z.object({
        id: z.number(),
        author: z.string(),
        title: z.string(),
        isbn: z.string(),
    }),
});

export const collections = { books };