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
            color: '#718096'
        }
    }),

};
