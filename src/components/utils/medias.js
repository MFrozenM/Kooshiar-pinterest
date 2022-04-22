export const calculateMedia = (width) => {
    if (width <= 500) {
        return [1, 1.2]
    }

    if (width > 500 && width <= 800) {
        return [2, 2.2]
    }

    if (width > 800 && width <= 1000) {
        return [3, 3.2]
    }

    if (width > 1000 && width <= 1500) {
        return [4, 4.2]
    }

    if (width > 1500 && width <= 1800) {
        return [5, 5.5]
    }

    if (width >= 1800) {
        return [6, 5.8]
    }

    return [6, 5.8]
}
