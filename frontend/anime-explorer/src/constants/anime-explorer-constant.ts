export const AnimeExplorerConstants = {
    textFieldStyles: (isMobile: boolean) => ({
        '& .MuiOutlinedInput-root': {
            color: 'white',
            backgroundColor: '#1f1f2e',
            '& fieldset': { borderColor: '#1f1f1f', borderWidth: '1px' },
            '&:hover fieldset': { borderWidth: '2px' },
            '&.Mui-focused fieldset': { borderColor: '#f8286c', borderWidth: '2px' },
            '&.Mui-error fieldset': { borderColor: '#ff4444 !important', borderWidth: '2px !important' },
            '&.Mui-error:hover fieldset': { borderColor: '#ff4444 !important' },
            '&.Mui-error.Mui-focused fieldset': { borderColor: '#ff4444 !important' },
            '& .MuiInputBase-input': {
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '8px 10px' : '12px 14px',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#96a1b1',
            fontSize: isMobile ? '12px' : '14px',
            transform: 'translate(14px, 12px) scale(1)',
            '&.Mui-focused': { color: '#f8286c', transform: 'translate(14px, -9px) scale(0.75)' },
            '&.MuiInputLabel-shrink': { transform: 'translate(14px, -9px) scale(0.75)' },
            '&.Mui-error': { color: '#ff4444' },
            '&.Mui-error.Mui-focused': { color: '#ff4444' },
        },
        '& .MuiFormHelperText-root': {
            color: '#ff4444',
            fontSize: isMobile ? '10px' : '12px',
            marginLeft: 0,
            marginTop: '4px',
        },
    }),

    buttonStyles: (isMobile: boolean) => ({
        textTransform: 'none',
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '600',
        padding: isMobile ? '8px' : '12px',
        backgroundColor: 'transparent',
        '&:hover': { opacity: 0.9, backgroundColor: 'transparent' },
        '&.Mui-disabled': {
            backgroundColor: '#2d3748',
            color: '#718096',
        },
    }),

    userColumns: [
        { id: 'user', label: 'User', minWidth: 200 },
        { id: 'role', label: 'Role', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'joinedDate', label: 'Joined Date', minWidth: 100 },
        { id: 'actions', label: 'Actions', minWidth: 50 },
    ] as const,

    animeColumns: [
        { id: 'animePoster', label: 'Poster', minWidth: 80 },
        { id: 'titleEN', label: 'Title', minWidth: 200 },
        { id: 'titleJP', label: 'Japanese Title', minWidth: 200 },
        { id: 'releaseDate', label: 'Release Date', minWidth: 130 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'genres', label: 'Genres', minWidth: 150 },
        { id: 'studios', label: 'Studios', minWidth: 150 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'character', label: 'Characters', minWidth: 200 },
        { id: 'Staff', label: 'Staff', minWidth: 200 },
        { id: 'pv', label: 'PV', minWidth: 100 },
    ] as const,

    newsColumns: [
        { id: 'newsPoster', label: 'Poster', minWidth: 100 },
        { id: 'newsAuthor', label: 'Author', minWidth: 200 },
        { id: 'postedDate', label: 'Posted Date', minWidth: 120 },
        { id: 'newsTitle', label: 'Title', minWidth: 200 },
        { id: 'newsDescription', label: 'Description', minWidth: 100 },
        { id: 'newsContent', label: 'Content', minWidth: 100 },
    ] as const,
};
