import {useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

interface BatchUploadModalProps {
    open: boolean,
    onClose: () => void;
}

export const BatchUploadModal = ({open, onClose}: BatchUploadModalProps) => {
    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("No file chosen");
        }
    };

    const handleUpload = () => {
        if (!fileName) return alert("Please select a file.");
        onClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} sx={{border: "1px solid #201c2c"}}>
                <DialogTitle className="bg-[#0b0e13] text-white font-bold">
                    Batch Upload Anime
                </DialogTitle>
                <DialogContent className="bg-[#0b0e13] text-white">
                    <p className="text-gray-400 text-sm">Upload an Excel file containing anime data for bulk import.</p>
                    <Box mt={2} className="flex items-center gap-3">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            id="file-upload"
                            onChange={handleFileChange}
                            style={{display: "none"}}
                        />
                        <label htmlFor="file-upload">
                            <Button
                                variant="outlined"
                                component="span"
                                sx={{
                                    minWidth: "120px",
                                    border: "1px solid #201c2c",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    borderRadius: "4px",
                                    mt: "10px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        borderColor: "#F43F5E",
                                    },
                                }}>
                                Choose File
                            </Button>
                        </label>
                        <Typography variant="body2" mt={1} color="white">
                            {fileName}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions className="bg-[#0b0e13] text-white">
                    <Button sx={{color: "white", border: "1px solid #201c2c"}} onClick={onClose}>Cancel</Button>
                    <Button
                        className="border border-color-[#F43F5E]"
                        onClick={handleUpload}
                        sx={{
                            background: "linear-gradient(135deg, hsl(347 87% 61%), hsl(315 80% 65%))",
                            color: "white"
                        }}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
