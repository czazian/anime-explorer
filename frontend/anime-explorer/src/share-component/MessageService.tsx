import { createContext, useContext, useState, type ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { SnackbarProps } from "@mui/material/Snackbar";
import type { AlertProps } from "@mui/material/Alert";

interface MessageOptions {
    message: string;
    severity?: AlertProps['severity']; // 'error' | 'warning' | 'info' | 'success'
    autoHideDuration?: number;
    anchorOrigin?: SnackbarProps['anchorOrigin'];
    action?: SnackbarProps['action'];
    variant?: 'filled' | 'outlined' | 'standard';
}

interface MessageServiceContextProps {
    showMessage: (messageOrOptions: string | MessageOptions) => void;
    showSuccess: (message: string, options?: Partial<MessageOptions>) => void;
    showError: (message: string, options?: Partial<MessageOptions>) => void;
    showWarning: (message: string, options?: Partial<MessageOptions>) => void;
    showInfo: (message: string, options?: Partial<MessageOptions>) => void;
}

const MessageServiceContext = createContext<MessageServiceContextProps | undefined>(undefined);

export const useMessageService = () => {
    const context = useContext(MessageServiceContext);
    if (!context) {
        throw new Error("useMessageService must be used within a MessageServiceProvider");
    }
    return context;
};

interface MessageServiceProviderProps {
    children: ReactNode;
    defaultOptions?: Partial<MessageOptions>;
}

export const MessageService = ({
                                   children,
                                   defaultOptions = {}
                               }: MessageServiceProviderProps) => {
    const [open, setOpen] = useState(false);
    const [messageOptions, setMessageOptions] = useState<MessageOptions>({
        message: "",
        severity: undefined,
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        variant: "filled",
        ...defaultOptions
    });

    const showMessage = (messageOrOptions: string | MessageOptions) => {
        const options: MessageOptions = typeof messageOrOptions === 'string'
            ? { ...messageOptions, message: messageOrOptions }
            : { ...messageOptions, ...messageOrOptions };

        setMessageOptions(options);
        setOpen(true);
    };

    const showSuccess = (message: string, options: Partial<MessageOptions> = {}) => {
        showMessage({ message, severity: 'success', ...options });
    };

    const showError = (message: string, options: Partial<MessageOptions> = {}) => {
        showMessage({ message, severity: 'error', ...options });
    };

    const showWarning = (message: string, options: Partial<MessageOptions> = {}) => {
        showMessage({ message, severity: 'warning', ...options });
    };

    const showInfo = (message: string, options: Partial<MessageOptions> = {}) => {
        showMessage({ message, severity: 'info', ...options });
    };

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return (
        <MessageServiceContext.Provider value={{
            showMessage,
            showSuccess,
            showError,
            showWarning,
            showInfo
        }}>
            {children}
            <Snackbar
                anchorOrigin={messageOptions.anchorOrigin}
                open={open}
                autoHideDuration={messageOptions.autoHideDuration}
                onClose={handleClose}
                action={messageOptions.action}>
                {messageOptions.severity ? (
                    <Alert
                        onClose={handleClose}
                        severity={messageOptions.severity}
                        variant={messageOptions.variant}
                        sx={{ width: '100%' }}>
                        {messageOptions.message}
                    </Alert>
                ) : (
                    <div>{messageOptions.message}</div>
                )}
            </Snackbar>
        </MessageServiceContext.Provider>
    );
};