export function convertDate(dateString) {
    // Split the string into parts by point
    const parts = dateString.split('.');

    // Retrieve day, month and year
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    // Form a new string in YYYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}