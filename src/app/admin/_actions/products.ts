//The purpose of this file is to get the data that from the form we are using server side rendering. 

"use server"
import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"

//using zad library
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

    fs.mkdir("products", { recursive: true })

    db.product.create({
        data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents
        filePath:
                imagePath:
        }
    })
}


}