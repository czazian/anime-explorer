import {type SubmitHandler, useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
} from "@mui/material";
import {AnimeExplorerConstants} from "../../../constants/anime-explorer-constant.ts";
import {useDevice} from "../../../utils/MobileContext.tsx";

interface AddAnimeFormProps {
    open: boolean;
    onClose: () => void;
}

const schema = z.object({
    animeName: z.string().min(1, {
        message: "Anime name cannot be empty",
    }),
    animeNameJp: z.string().min(1, {
        message: "Anime Japanese Name cannot be empty",
    }),
    animePvUrl: z.string().url({
        message: "PV URL must be a valid URL",
    }).optional().or(z.literal("")),
    animeImage: z.string().url({
        message: "Image must be a valid URL",
    }).optional().or(z.literal("")),
    animePoster: z.string().url({
        message: "Poster must be a valid URL",
    }).optional().or(z.literal("")),
    animeDescription: z.string().min(1, {
        message: "Anime description cannot be empty",
    }),
    animeReleaseDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
    animeStatus: z.union([
        z.literal("ONGOING"),
        z.literal("COMPLETED"),
        z.literal("UPCOMING"),
    ]),
    genreId: z.string().min(1, {
        message: "Genre ID cannot be empty",
    }),
    studioId: z.string().min(1, {
        message: "Studio ID cannot be empty",
    }),
    season: z.union([
        z.literal("WINTER"),
        z.literal("SPRING"),
        z.literal("SUMMER"),
        z.literal("FALL"),
    ]),
    characterId: z.string().min(1, {
        message: "Character ID cannot be empty",
    }),
});

type FormFields = z.infer<typeof schema>;

const animeStatusOptions = ["ONGOING", "COMPLETED", "UPCOMING"];
const seasonOptions = ["WINTER", "SPRING", "SUMMER", "FALL"];

export function AddAnimeForm({open, onClose}: AddAnimeFormProps) {
    const {isMobile} = useDevice();
    const textFieldStyles = AnimeExplorerConstants.textFieldStyles(isMobile);

    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            animeName: "",
            animeNameJp: "",
            animePvUrl: "",
            animeImage: "",
            animePoster: "",
            animeDescription: "",
            animeReleaseDate: "",
            animeStatus: "ONGOING",
            genreId: "",
            studioId: "",
            season: "WINTER",
            characterId: "",
        },
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        reset();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: "#0b0e13",
                    border: "1px solid #201c2c",
                },
            }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle className="bg-[#0b0e13] text-white font-bold">
                    Create Anime
                </DialogTitle>
                <DialogContent className="bg-[#0b0e13] flex gap-5">
                    <div className={`w-1/2 flex flex-col gap-4 py-2`}>
                        {/* Anime Name */}
                        <div>
                            <TextField
                                {...register("animeName")}
                                label="Anime Name"
                                fullWidth
                                error={!!errors.animeName}
                                helperText={errors.animeName?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* Anime Japanese Name */}
                        <div>
                            <TextField
                                {...register("animeNameJp")}
                                label="Anime Japanese Name"
                                fullWidth
                                error={!!errors.animeNameJp}
                                helperText={errors.animeNameJp?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* PV URL */}
                        <div>
                            <TextField
                                {...register("animePvUrl")}
                                label="PV URL (Optional)"
                                fullWidth
                                error={!!errors.animePvUrl}
                                helperText={errors.animePvUrl?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <TextField
                                {...register("animeImage")}
                                label="Image URL (Optional)"
                                fullWidth
                                error={!!errors.animeImage}
                                helperText={errors.animeImage?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* Poster URL */}
                        <div>
                            <TextField
                                {...register("animePoster")}
                                label="Poster URL (Optional)"
                                fullWidth
                                error={!!errors.animePoster}
                                helperText={errors.animePoster?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <TextField
                                {...register("animeDescription")}
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                error={!!errors.animeDescription}
                                helperText={errors.animeDescription?.message}
                                sx={textFieldStyles}
                            />
                        </div>
                    </div>

                    <div className={`w-1/2 flex flex-col gap-4 py-2`}>
                        {/* Release Date */}
                        <div>
                            <TextField
                                {...register("animeReleaseDate")}
                                label="Release Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                error={!!errors.animeReleaseDate}
                                helperText={errors.animeReleaseDate?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <Controller
                                name="animeStatus"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Status"
                                        fullWidth
                                        error={!!errors.animeStatus}
                                        helperText={errors.animeStatus?.message}
                                        sx={textFieldStyles}>
                                        {animeStatusOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </div>

                        {/* Season */}
                        <div>
                            <Controller
                                name="season"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Season"
                                        fullWidth
                                        error={!!errors.season}
                                        helperText={errors.season?.message}
                                        sx={textFieldStyles}>
                                        {seasonOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </div>

                        {/* Genre ID */}
                        <div>
                            <TextField
                                {...register("genreId")}
                                label="Genre ID"
                                fullWidth
                                error={!!errors.genreId}
                                helperText={errors.genreId?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* Studio ID */}
                        <div>
                            <TextField
                                {...register("studioId")}
                                label="Studio ID"
                                fullWidth
                                error={!!errors.studioId}
                                helperText={errors.studioId?.message}
                                sx={textFieldStyles}
                            />
                        </div>

                        {/* Character ID */}
                        <div>
                            <TextField
                                {...register("characterId")}
                                label="Character ID"
                                fullWidth
                                error={!!errors.characterId}
                                helperText={errors.characterId?.message}
                                sx={textFieldStyles}
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions className="bg-[#0b0e13] text-white">
                    <Button
                        sx={{color: "white", border: "1px solid #201c2c"}}
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        sx={{
                            background:
                                "linear-gradient(135deg, hsl(347 87% 61%), hsl(315 80% 65%))",
                            color: "white",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, hsl(347 77% 55%), hsl(315 70% 59%))",
                            },
                        }}>
                        {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
        ;
}