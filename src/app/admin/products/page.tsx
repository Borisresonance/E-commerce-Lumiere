import { PageHeader } from "../_components/PageHeader"
import { Button } from "@/components/ui/Button"
import { Table, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table"
import  db from "../../../db/db"
import Link from "next/link"

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products </PageHeader>
                <Button>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <ProductsTable />

        </>
    )
}

async function ProductsTable() {
    const products = await db.product.findMany ({
        select : {
            id: true,
            name: true,
            priceInCents:true,
            isAvailableForPurchase: true,
            _count:{select: {orders:true}}
        },
        orderBy: {name:"asc"}
    })
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-0">
                            <span className="sr-only">Avalilable For Purchase</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead className="w-0">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>

                </TableHeader>
                <TableBody>

                </TableBody>
            </Table>

        </div>

    )
}