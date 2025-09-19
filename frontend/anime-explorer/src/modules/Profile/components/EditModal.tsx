import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useDevice} from "../../../utils/MobileContext.tsx";
import {Box, CircularProgress, TextField} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {AnimeExplorerConstants} from "../../../constants/anime-explorer-constant.ts";
import Avatar from "../../../assets/avatar.png";
import ApiRestService from "../../../rest-service/api-rest-service.ts";
import {useState, useRef, type ChangeEvent} from "react";
import {useAuth} from "../../../utils/AuthContext.tsx";
import {useMessageService} from "../../../share-component/MessageService.tsx";

interface EditModalProps {
    onClose: () => void;
}

const schema = z.object({
    username: z
        .string()
        .min(1, "Username is required"),
    profileDescription: z
        .string()
});

type FormData = z.infer<typeof schema>;

export const EditModal = ({onClose}: EditModalProps) => {
    const {isMobile} = useDevice();
    const {showMessage} = useMessageService();
    const {user, setUser} = useAuth();
    const [preview, setPreview] = useState<string | null>(user?.profileImage ?? Avatar);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textFieldStyles = AnimeExplorerConstants.textFieldStyles(isMobile);
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: user?.username ?? "",
            profileDescription: user?.profileDescription ?? "",
        }
    });

    const onSubmit = async (data: FormData) => {
        if (!user) return;
        if (imageError) {
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("profileDescription", data.profileDescription);

        if (selectedFile) {
            formData.append("profileImage", selectedFile);
        }

        try {
            const updatedUser = await ApiRestService.updateProfile(user.userId, formData);
            setUser(updatedUser);
            sessionStorage.setItem("user", JSON.stringify(updatedUser));
            setIsLoading(false);
            onClose();

            showMessage({
                message: "Profile Updated Successfully",
                severity: "success",
                autoHideDuration: 3000,
                anchorOrigin: {vertical: "top", horizontal: "center"}
            });
        } catch (error) {
            setIsLoading(false);
            console.error("Failed to update profile:", error);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageError(null);

            if (file.size > MAX_FILE_SIZE) {
                showMessage({
                    message: "Image size must be less than 10MB",
                    severity: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: {vertical: "top", horizontal: "center"}
                });
                setImageError("Image size must be less than 10MB");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setSelectedFile(null);
                return;
            }

            if (!file.type.startsWith('image/')) {
                setImageError("Please select a valid image file");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setSelectedFile(null);
                return;
            }

            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center mt-10 justify-center bg-black bg-opacity-50 px-3">
            {!isLoading && (
                <div className="rounded-md mb-6 p-6 w-96 bg-[#0b0e13] border border-color-[#F43F5E]">
                    <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex justify-center cursor-pointer opacity-50 relative" onClick={handleImageClick}>
                            <FileUploadIcon className="absolute top-1/2 -translate-y-1/2" fontSize="medium"/>
                            <Box
                                sx={{
                                    border: "4px solid #1F2937",
                                    width: isMobile ? 100 : 120,
                                    height: isMobile ? 100 : 120,
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    backgroundColor: "white",
                                }}>
                                <img
                                    draggable={false}
                                    src={preview ?? ""}
                                    alt="Profile"
                                    width={isMobile ? 100 : 120}
                                    height={isMobile ? 100 : 120}
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{display: "none"}}
                                    onChange={handleFileChange}
                                />
                            </Box>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Username</label>
                            <TextField
                                {...register("username")}
                                sx={textFieldStyles}
                                defaultValue={user?.username ?? ""}
                                className="w-full border rounded-md p-2 mt-1 bg-[#1f1f2e]"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Profile Description</label>
                            <TextField
                                {...register("profileDescription")}
                                defaultValue={user?.profileDescription ?? ""}
                                multiline
                                minRows={3}
                                maxRows={6}
                                sx={{
                                    ...textFieldStyles,
                                    '& .MuiInputBase-root': {
                                        ...textFieldStyles['& .MuiOutlinedInput-root'],
                                        margin: 0,
                                        padding: 0,
                                    },
                                }}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                disabled={isLoading}
                                type="button"
                                onClick={onClose}
                                className="text-sm px-2 py-2  rounded-md bg-gray-400">
                                Cancel
                            </button>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="text-sm px-2 py-2 rounded-md text-white bg-gradient-primary hover:opacity-90">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {isLoading && <CircularProgress size="3rem"  sx={{ color: "#F43F5E" }}  />}
        </div>
    );
}