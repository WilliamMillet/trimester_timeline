import { Box, Typography, Button } from '@mui/material';

const LandingPage = () => {
    return (
        <main className="landing-page">
            <Box
                sx={{
                    backgroundColor: 'var(--background-1)',
                    color: 'var(--text-1)',
                    padding: '2rem',
                    borderRadius: 'var(--standard-radius)',
                    maxWidth: '600px',
                    margin: 'auto',
                    textAlign: 'left',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        background: `linear-gradient(90deg, var(--color-primary-gradient-start) 10%, var(--color-primary-gradient-end)) 40%`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                    }}
                >
                    Never leave an assignment late again
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
                    With Trimester Timeline, you can know for certain how long assignments will take 
                    and make sure you're starting early enough
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: '2rem' }}>
                    <Button
                        variant="contained"
                        sx={{
                            background: `linear-gradient(90deg, var(--color-primary-gradient-start), var(--color-primary-gradient-end))`,
                            color: '#000',
                            fontWeight: 'bold',
                        }}
                    >
                        Signup now
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: 'var(--color-primary-1)',
                            color: 'var(--color-primary-1)',
                            fontWeight: 'bold',
                        }}
                    >
                        Learn more
                    </Button>
                </Box>
                <Box
                    sx={{
                        backgroundColor: 'var(--background-2)',
                        padding: '1rem',
                        borderRadius: 'var(--standard-radius)',
                    }}
                >
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        "This saved my life..."
                    </Typography>
                    <Typography variant="subtitle2" sx={{ marginTop: '0.5rem' }}>
                        - William Millet
                    </Typography>
                </Box>
            </Box>
        </main>
    );
}

export default LandingPage;
