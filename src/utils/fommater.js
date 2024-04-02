export const uppercaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`, boardId: column.boardId, columnId: column._id,
        FE_PlaceholderCard: true// Đây là card placeholder, không có thực tế từ phía server trả về
    }
}
