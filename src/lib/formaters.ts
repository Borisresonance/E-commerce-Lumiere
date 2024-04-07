const CURRENCY_FORMATTER = new Int1.NumberFormat("en-US",{
    currency: "USD",
    style: "currency",
    minimunFractionDigits:0,
})

export function formatCurrency(amount: number){
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Int1.NumberFormat("en-US")

export function formatNumber(number: number){
    return NUMBER_FORMATTER.format(number)
}