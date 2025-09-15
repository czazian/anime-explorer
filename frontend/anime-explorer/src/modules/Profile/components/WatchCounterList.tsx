import * as React from "react";
import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";
import {useDevice} from "../../../utils/MobileContext.tsx";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from '@mui/icons-material/Star';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export const WatchCounterList = () => {
    const [tabSelection, setTabSelection] = useState("watching");
    const {isMobile} = useDevice();

    const handleDetailTabSelectionChange = (_event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        if (newSelection !== null) setTabSelection(newSelection);
    };

    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        return views.toLocaleString();
    };

    const tabOptions = [
        {value: "watching", label: "Watching"},
        {value: "completed", label: "Completed"},
        {value: "planToWatch", label: "Plan to Watch"},
        {value: "favorite", label: "Favorite"},
    ];

    const watchList = [
        {
            watching: [
                {
                    animeId: "ABE123",
                    animeName: "Seirei Gensouki: Spirit Chronicles",
                    animeNameJp: "精霊幻想記",
                    animePvUrl: "https://youtu.be/bkRkxdUa_r0?si=tc60gNwjKfzJiWUR",
                    animeImage: "https://m.media-amazon.com/images/M/MV5BNzBhMTgwZGYtZWJmOS00NTg0LWFmNDAtNTIxZTNmODIxNmQ0XkEyXkFqcGc@._V1_.jpg",
                    animePoster: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
                    animeDescription: "After losing his mother After losing his mother After losing his mother After losing his mother After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one. After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one.",
                    animeRating: 7.4,
                    animeReleaseDate: 2021,
                    animeViews: 1200000,
                    animeStatus: "Watching",
                    animeGenres: ["Isekai", "Sword and Fantasy", "Action"],
                    animeStudio: ["WIT Studio", "MAPPA"],
                },
            ],
        },
        {
            completed: [
                {
                    animeId: "XYZ456",
                    animeName: "One Piece",
                    animeNameJp: "ワンピース",
                    animePvUrl: "https://youtu.be/example",
                    animeImage: "https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_.jpg",
                    animePoster: "https://example.com/onepiece-poster.jpg",
                    animeDescription: "Monkey D. Luffy sails the seas with his crew to find the ultimate treasure known as One Piece.",
                    animeRating: 9.1,
                    animeReleaseDate: 1999,
                    animeViews: 5000000,
                    animeStatus: "Completed",
                    animeGenres: ["Action", "Adventure", "Comedy"],
                    animeStudio: ["Toei Animation"],
                },
                {
                    animeId: "ABC789",
                    animeName: "Death Note",
                    animeNameJp: "デスノート",
                    animePvUrl: "https://youtu.be/example2",
                    animeImage: "https://m.media-amazon.com/images/M/MV5BYTgyZDhmMTEtZDFhNi00MTc4LTg3NjUtYWJlNGE5Mzk2NzMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                    animePoster: "https://example.com/deathnote-poster.jpg",
                    animeDescription: "A high school student discovers a notebook that kills anyone whose name is written in it.",
                    animeRating: 8.8,
                    animeReleaseDate: 2006,
                    animeViews: 3000000,
                    animeStatus: "Completed",
                    animeGenres: ["Mystery", "Supernatural", "Thriller"],
                    animeStudio: ["Madhouse"],
                },
            ],
        },
        {
            planToWatch: [
                {
                    animeId: "DEF321",
                    animeName: "Attack on Titan",
                    animeNameJp: "進撃の巨人",
                    animePvUrl: "https://youtu.be/example3",
                    animeImage: "https://m.media-amazon.com/images/M/MV5BN2EzYTYyNGUtOTE2ZS00ZTljLWE5M2EtZDViYjhmYzgwNThhXkEyXkFqcGc@._V1_.jpg",
                    animePoster: "https://example.com/aot-poster.jpg",
                    animeDescription: "Humans fight against giant humanoid creatures known as Titans to survive.",
                    animeRating: 9.0,
                    animeReleaseDate: 2013,
                    animeViews: 4500000,
                    animeStatus: "Plan to Watch",
                    animeGenres: ["Action", "Drama", "Fantasy"],
                    animeStudio: ["WIT Studio", "MAPPA"],
                },
            ],
        },
        {
            favorite: [
                {
                    animeId: "DEF321",
                    animeName: "Attack on Titan",
                    animeNameJp: "進撃の巨人",
                    animePvUrl: "https://youtu.be/example3",
                    animeImage: "https://m.media-amazon.com/images/M/MV5BN2EzYTYyNGUtOTE2ZS00ZTljLWE5M2EtZDViYjhmYzgwNThhXkEyXkFqcGc@._V1_.jpg",
                    animePoster: "https://example.com/aot-poster.jpg",
                    animeDescription: "Humans fight against giant humanoid creatures known as Titans to survive.",
                    animeRating: 9.0,
                    animeReleaseDate: 2013,
                    animeViews: 4500000,
                    animeStatus: "Favorite",
                    animeGenres: ["Action", "Drama", "Fantasy"],
                    animeStudio: ["WIT Studio", "MAPPA"],
                },
            ],
        },
    ];

    const renderTabItemList = () => {
        if (!tabSelection) return [];
        const categoryObj = watchList.find(obj => obj.hasOwnProperty(tabSelection));

        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
              {categoryObj[tabSelection].map(anime => (
                  <Box
                      onClick={() => navigate(`/anime-detail/${anime.animeId}`)}
                      key={anime.animeId}
                      className={`${isMobile ? "h-[400px]" : "h-[520px]"} group cursor-pointer`}
                      sx={{
                          border: '1px solid #212121',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                              border: '1px solid #F43F5E',
                              scale: '1.02',
                              boxShadow: '0 8px 25px rgba(244, 63, 94, 0.15)'
                          },
                      }}>

                      <Box
                          className="relative"
                          sx={{
                              height: '60%',
                              overflow: 'hidden',
                              borderRadius: '8px 8px 0 0',
                          }}>

                          <Box
                              style={{
                                  height: '100%',
                                  backgroundImage: `url('${anime.animeImage}')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                              }}
                              sx={{
                                  transition: 'transform 0.3s ease-in-out',
                                  transformOrigin: 'center',
                              }}
                              className="group-hover:scale-105"
                          />

                          <div
                              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10">
                              <div className="flex justify-between items-center">
                                  <div className="flex flex-row gap-3 items-center">
                                      <div className="text-white flex items-center text-xs sm:text-sm">
                                          <StarIcon className="text-yellow-500 mr-1" sx={{ fontSize: isMobile ? 14 : 18 }} />
                                          <span className="font-medium">{anime.animeRating}/10</span>
                                      </div>
                                      <div className="text-white flex items-center text-xs sm:text-sm">
                                          <RemoveRedEyeOutlinedIcon sx={{ fontSize: isMobile ? 14 : 18 }} className="mr-1" />
                                          <span className="font-medium">{formatViews(anime.animeViews)}</span>
                                      </div>
                                  </div>

                                  <div className="text-white flex items-center text-xs sm:text-sm">
                                      <CalendarMonthIcon sx={{ fontSize: isMobile ? 14 : 18 }} className="mr-1" />
                                      <span className="font-medium">{anime.animeReleaseDate}</span>
                                  </div>
                              </div>
                          </div>

                      </Box>

                      <div
                          className="flex flex-col justify-between h-2/5 p-4"
                          style={{
                              overflow: 'hidden',
                          }}>

                          <div className="flex flex-col">
                              <h3 className={`font-semibold ${isMobile ? "text-sm" : "text-lg"} mb-2 line-clamp-2 text-white leading-tight`}>
                                  {anime.animeName}
                              </h3>

                              <p className={`text-gray-400 line-clamp-3 text-justify ${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}>
                                  {anime.animeDescription}
                              </p>
                          </div>

                          {anime.animeGenres && anime.animeGenres.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                  {anime.animeGenres.slice(0, 2).map((genre, index) => (
                                      <span
                                          key={index}
                                          className={`text-xs mr-1 px-3 py-1 bg-gray-700 border-black text-white rounded-full font-medium`}>
                                                    {genre}
                                                </span>
                                  ))}
                                  {anime.animeGenres.length > 2 && (
                                      <span
                                          className="text-xs mr-1 px-3 py-1 bg-gray-700 border-black text-white rounded-full font-medium">+{anime.animeGenres.length - 2}</span>
                                  )}
                              </div>
                          )}
                      </div>
                  </Box>
              ))}
          </div>
        );
    }

    return (
        <div className={`flex flex-col gap-2`}>
            <ToggleButtonGroup
                value={tabSelection}
                exclusive
                onChange={handleDetailTabSelectionChange}
                className="w-full bg-[#1f1f2e] p-1 rounded-md mb-2"
                sx={{display: "flex", gap: "4px", height: isMobile ? 36 : 40}}>
                {tabOptions.map((option) => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        sx={{
                            flex: 1,
                            border: "none",
                            borderRadius: "4px",
                            color: "#96a1b1",
                            textTransform: "none",
                            fontSize: isMobile ? '13px' : '14px',
                            backgroundColor: "transparent",
                            "&.Mui-selected": {
                                backgroundColor: "#0b0e13 !important",
                                fontWeight: "bold",
                                color: "white"
                            },
                        }}>
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <div className={``}>
                { renderTabItemList() }
            </div>
        </div>
    );
}