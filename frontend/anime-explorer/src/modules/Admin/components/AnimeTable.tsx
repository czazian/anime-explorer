import {type ChangeEvent, type FC, useMemo, useState} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import AvatarIcon from "../../../assets/avatar.png"
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import type {Column} from "../../../model/Column.ts";
import type {User} from "../../../model/User.ts";
import type {Anime} from "../../../model/Anime.ts";
import type {News} from "../../../model/News.ts";
import {AnimeExplorerConstants} from "../../../constants/anime-explorer-constant.ts";
import {useDevice} from "../../../utils/MobileContext.tsx";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddIcon from '@mui/icons-material/Add';
import {BatchUploadModal} from "./BatchUploadModal.tsx";

interface AdminTableProps {
    columns: readonly Column[];
    data: User[] | Anime[] | News[];
    tabSelection: string;
}

export const AdminTable: FC<AdminTableProps> = ({columns, data, tabSelection}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const {isMobile} = useDevice();
    const textFieldStyles = AnimeExplorerConstants.textFieldStyles(isMobile);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return data;
        const query = searchQuery.toLowerCase().trim();

        return data.filter((row) => {
            const searchableFields = Object.entries(row).map(([_key, value]) => {
                if (value === null || value === undefined) return '';

                if (Array.isArray(value)) {
                    return value.join(' ').toLowerCase();
                }

                if (typeof value === 'object') {
                    return JSON.stringify(value).toLowerCase();
                }

                return value.toString().toLowerCase();
            });

            return searchableFields.some(field => field.includes(query));
        });
    }, [data, searchQuery]);

    const renderCellContent = (row: User | Anime | News, column: Column) => {
        const value = (row as any)[column.id];

        // User
        if (column.id === 'user' && 'username' in row) {
            const user = row as User;
            return (
                <div className="flex items-center gap-2">
                    {user.profileImage ? (
                        <img src={user.profileImage} alt="profile" className="w-8 h-8 rounded-full object-cover"/>
                    ) : (
                        <img src={AvatarIcon} alt="profile" className="w-8 h-8 rounded-full object-cover"/>
                    )}
                    <div>
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                </div>
            );
        }

        // Role
        if (column.id === 'role' && 'role' in row) {
            const user = row as User;
            return (
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                    {user.role}
                </span>
            );
        }

        // Joined Date
        if (column.id === 'joinedDate' && 'createdAt' in row) {
            const user = row as User;
            return new Date(user.createdAt).toLocaleDateString();
        }

        // Anime Poster
        if (column.id === 'animePoster' && 'animePoster' in row) {
            const anime = row as Anime;
            return anime.animeImage ? (
                <img src={anime.animeImage} alt="anime poster" className="w-12 h-16 object-cover rounded"/>
            ) : (
                <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center text-xs">No Image</div>
            );
        }

        // Title English
        if (column.id === 'titleEN' && 'animeName' in row) {
            const anime = row as Anime;
            return (
                <div>
                    <div className="font-medium">{anime.animeName}</div>
                    <div className="text-sm text-gray-500">Views: {anime.animeViews?.toLocaleString()}</div>
                </div>
            );
        }

        // Title Japanese
        if (column.id === 'titleJP' && 'animeNameJp' in row) {
            const anime = row as Anime;
            return anime.animeNameJp || 'N/A';
        }

        // Release Date
        if (column.id === 'releaseDate' && 'animeReleaseDate' in row) {
            const anime = row as Anime;
            return anime.animeReleaseDate ? new Date(anime.animeReleaseDate).toLocaleDateString() : 'N/A';
        }

        // Status
        if (column.id === 'status' && ('animeStatus' in row || 'role' in row)) {
            if ('animeStatus' in row) {
                const anime = row as Anime;
                const status = anime.animeStatus;
                const isActive = status === 'Ongoing' || status === 'Completed';
                return (
                    <span className={`px-2 py-1 rounded text-sm ${
                        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {status}
                    </span>
                );
            }
        }

        // Genres
        if (column.id === 'genres' && 'animeGenres' in row) {
            const anime = row as Anime;
            return anime.animeGenres?.join(', ') || 'N/A';
        }

        // Studios
        if (column.id === 'studios' && 'animeStudio' in row) {
            const anime = row as Anime;
            return anime.animeStudio?.join(', ') || 'N/A';
        }

        // Description
        if (column.id === 'description' && 'animeDescription' in row) {
            const anime = row as Anime;
            return (
                <div className="max-w-xs truncate" title={anime.animeDescription}>
                    {anime.animeDescription || 'No description'}
                </div>
            );
        }

        // PV
        if (column.id === 'pv' && 'animePvUrl' in row) {
            const anime = row as Anime;
            return anime.animePvUrl ? (
                <a href={anime.animePvUrl} target="_blank" rel="noopener noreferrer"
                   className="text-blue-500 hover:underline">
                    Watch PV
                </a>
            ) : 'N/A';
        }

        // News Poster
        if (column.id === 'newsPoster' && 'newsPoster' in row) {
            const news = row as News;
            return news.newsPoster ? (
                <img src={news.newsPoster} alt="news poster" className="w-16 h-10 object-cover rounded"/>
            ) : (
                <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-xs">No Image</div>
            );
        }

        // News Author
        if (column.id === 'newsAuthor' && 'newsAuthor' in row) {
            const news = row as News;
            return news.newsAuthor || 'Anonymous';
        }

        // Posted Date
        if (column.id === 'postedDate' && 'newsPostDate' in row) {
            const news = row as News;
            return news.newsPostDate ? new Date(news.newsPostDate).toLocaleDateString() : 'N/A';
        }

        // News Title
        if (column.id === 'newsTitle' && 'newsTitle' in row) {
            const news = row as News;
            return (
                <div>
                    <div className="font-medium">{news.newsTitle}</div>
                </div>
            );
        }

        // News Descriptions
        if (column.id === 'newsDescription' && 'newsDescription' in row) {
            const news = row as News;
            return (
                <div className="max-w-xs truncate" title={news.newsDescription}>
                    {news.newsDescription || 'No description'}
                </div>
            );
        }

        // News Content
        if (column.id === 'newsContent' && 'newsContent' in row) {
            const news = row as News;
            return (
                <div className="max-w-xs truncate" title={news.newsContent}>
                    {news.newsContent}
                </div>
            );
        }

        // Actions
        if (column.id === 'actions') {
            return (
                <div className="flex gap-2">
                    <button className="p-1 border border-color-[#F43F5E] rounded-lg">
                        <EditIcon/>
                    </button>
                    <button className="p-1 border border-color-[#F43F5E] rounded-lg">
                        <BlockIcon/>
                    </button>
                </div>
            );
        }

        if (column.format && typeof value === 'number') {
            return column.format(value);
        }

        return value || 'N/A';
    };

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <Paper sx={{backgroundColor: "transparent", width: '100%', overflow: 'hidden', color: 'white'}}
                   className="border border-color-[#F43F5E] p-6">
                <div className={`flex flex-row ${isMobile ? "flex-col gap-2" : "flex-row items-center justify-between"}`}>
                    <TextField
                        placeholder="Search..."
                        variant="outlined"
                        size="small"
                        sx={{
                            ...textFieldStyles,
                            width: isMobile ? "100%" : 350,
                            mb: 1,
                            alignSelf: isMobile ? '' : 'center',
                        }}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(0);
                        }}
                    />
                    {tabSelection === "anime" && (
                        <div className={`flex gap-2`}>
                            <Button
                                onClick={() => setOpen(true)}
                                sx={{
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: "12px",
                                    background: 'var(--gradient-secondary)',
                                    '&:hover': {
                                        opacity: 0.9,
                                    },
                                }}>
                                <FileUploadIcon fontSize="small"/>Batch Upload</Button>
                            <Button
                                sx={{
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: "12px",
                                    background: 'var(--gradient-primary)',
                                    '&:hover': {
                                        opacity: 0.9,
                                    },
                                }}>
                                <AddIcon fontSize="small"/>Add Anime</Button>
                        </div>
                    )}
                    {tabSelection === "news" && (
                        <div>
                            <Button
                                sx={{
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: "12px",
                                    background: 'var(--gradient-primary)',
                                    '&:hover': {
                                        opacity: 0.9,
                                    },
                                }}
                            ><AddIcon fontSize="small"/>Create Article</Button>
                        </div>
                    )}
                </div>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader sx={{borderCollapse: 'collapse'}} aria-label={`${tabSelection} table`}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth, color: 'white'}}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            fontWeight: 'bold',
                                        }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={`${tabSelection}-${index}`}
                                        sx={{
                                            '&:hover': {backgroundColor: '#100c14'},
                                            color: 'white',
                                        }}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align} sx={{color: 'white'}}>
                                                {renderCellContent(row, column)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        '& .MuiTablePagination-selectIcon': {color: 'white'},
                        '& .MuiTablePagination-select': {color: 'white'},
                        '& .MuiTablePagination-displayedRows': {color: 'white'},
                        '& .MuiButtonBase-root': {color: 'white'}
                    }}
                />
            </Paper>
            {open && (
              <BatchUploadModal open={open} onClose={() => setOpen(false)} />
            )}
        </div>
    );
};