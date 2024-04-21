//The purpose of this file is to get the data that from the form to add a new product

"use server"
import db from "@/db/db"
import { z } from "zod" // this l
import fs from "fs/promises"
import { redirect } from "next/dist/server/api-utils";

//using zod library
const fileSchema = z.instanceof(File, { message: "Requiered" });
const imageSchema = fileSchema.refine(
    // if file size is 0 there is no file submitted
    file => file.size === 0 || file.type.startsWith("image/")
)
// if file size is 0 there is no file submitted, 

//define the schema of the object
const addSchema = z.object({
    name: z.string().min(1),//name must be a string 
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Requiered"), //this will test if the file is not empy
    image: fileSchema.refine(file => file.size > 0, "Required")  //same here will test if file not empty
})

//this function will use the object schema 
export async function addProduct(formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}--${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `products/${crypto.randomUUID()}--${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    db.product.create({ data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath
        }
    })
    redirect("/admin/products")
}


