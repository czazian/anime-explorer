import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useEffect} from "react";

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Similar to ngOnInit in Angular
    useEffect(() => {
        console.error('Unable to access location: ', location.pathname);
    });

    // Return Content
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background overflow-hidden">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-8xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">404</h1>
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
                    <p className="text-muted-foreground mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={() => window.history.back()}
                        variant="outlined"
                        sx={{
                            width: '100%',
                            borderColor: '#F43F5E',
                            color: '#F43F5E',
                            '&:hover': {
                                borderColor: '#EC4899',
                                backgroundColor: 'rgba(244,63,94,0.1)',
                            },
                        }}>
                        Go Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #F43F5E, #EC4899)',
                            color: 'white',
                            '&:hover': {
                                opacity: 0.9,
                            },
                        }}>
                        Return to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;