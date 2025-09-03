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

let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const schedule = defineCollection({
    /* Retrieve all book entries from a JSON file. */
    loader: file(`src/data/schedule-${month}-${year}.json`),
    schema: z.array(
      z.object({
      id: z.number(),
      date: z.string(),
      activities: z.array(z.object({
        activity: z.string(),
        start: z.string(),
        end: z.string(),
        duration: z.number(),
        pay: z.number(),
      })),
      weekend: z.boolean(),
    })
    )
    });

export const collections = { books, schedule };
