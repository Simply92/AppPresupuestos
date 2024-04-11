
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(dateStr: string): string {
    console.log(dateStr)
    const dateObj = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}
