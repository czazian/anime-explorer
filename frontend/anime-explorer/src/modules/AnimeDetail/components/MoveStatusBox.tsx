import {FormControl, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {useDevice} from "../../../utils/MobileContext.tsx";
import UpdateIcon from '@mui/icons-material/Update';

// interface MoveStatusBoxProps {
//     anime: Anime;
// }

export const MoveStatusBox  = ()=> {
    const [status, setStatus] = useState<string>(''); // Initialize with empty string
    const {isMobile} = useDevice();

    const statusOptions = [
        { label: "Watching", value: "watching" },
        { label: "Completed", value: "completed" },
        { label: "Plan to Watch", value: "planToWatch" },
    ]

    const handleStatusChange = (event: SelectChangeEvent<any>) => {
        setStatus(event.target.value);
    };

    return (
        <div className="border border-gray-800 rounded-xl p-6 min-w-[330px] flex flex-col gap-3">
            <div className="sm:text-lg md:text-xl lg:text-xl"><UpdateIcon className="mr-2 mb-1"/>Update View Status</div>
            <div>
                <FormControl sx={{minWidth: "100%",}}>
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        displayEmpty
                        autoWidth
                        IconComponent={ArrowDropDownOutlinedIcon}
                        MenuProps={{
                            disableScrollLock: true,
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                }
                            }
                        }}
                        renderValue={(selected) => {
                            if (selected === '') {
                                return <span style={{ color: '#999' }}>Update Your View Status</span>;
                            }
                            const selectedOption = statusOptions.find(option => option.value === selected);
                            return selectedOption?.label;
                        }}
                        sx={{
                            color: "white",
                            "& .MuiOutlinedInput-input": {
                                padding: "12px",
                                fontSize: isMobile ? "14px" : "16px",
                                lineHeight: isMobile ? "20px" : "24px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#262626",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#f8286c",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#f8286c",
                            },
                            "& .MuiSelect-icon": {
                                color: "white",
                                fontSize: isMobile ? "18px" : "22px",
                            },
                        }}>
                        {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}