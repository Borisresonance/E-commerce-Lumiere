import { PageHeader } from "../_components/PageHeader"
import { Button } from "@/components/ui/Button"
import { Table, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table"
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

function ProductsTable() {
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