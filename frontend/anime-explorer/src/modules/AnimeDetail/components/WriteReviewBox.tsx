import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { Rating } from '@mui/material';
import {type FormEvent, type SyntheticEvent, useState} from "react";
import {useMessageService} from "../../../share-component/MessageService.tsx";
import {useDevice} from "../../../utils/MobileContext.tsx";

// interface WriteReviewBoxProps {
//     anime?: Anime
// }

// Declare an Interface as From Group
// interface ReviewData {
//     rating: number;
//     content: string;
// }

export const WriteReviewBox = () => {
    const {isMobile} = useDevice();

    // Call Share Component
    const { showMessage } = useMessageService();

    // Declare States for Submission
    const [selectedRating, setSelectedRating] = useState<number | null>(0);
    const [reviewContent, setReviewContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingChange = (_event: SyntheticEvent, newValue: number | null) => {
        setSelectedRating(newValue);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Return is any errors
        if (!selectedRating || selectedRating === 0) {
            alert('Please select a rating');
            return;
        }

        // Update submission to Pass
        setIsSubmitting(true);

        // Fill verified data into interface for submission
        // const reviewData: ReviewData = {
        //     rating: selectedRating,
        //     content: !reviewContent.trim()
        //         ? 'No comment provided'
        //         : reviewContent.trim()
        // };

        try {
            // Submission to Backend Database
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset Inputs
            setSelectedRating(0);
            setReviewContent('');

            // Success Msg
            showMessage({
                message: "Review Submitted Successfully",
                severity: "success",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "center" }
            });
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            // Reset submission state
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`border border-gray-800 rounded-xl p-6 ${isMobile ? "" : "min-w-[300px]"}`}>
            <p className="sm:text-lg md:text-xl lg:text-xl">
                <DriveFileRenameOutlineOutlinedIcon className="mr-2 mb-1"/>
                Write Review
            </p>

            <form onSubmit={handleSubmit} className="pb-5">
                <div className="flex flex-col">
                    <label className="md:text-sm sm:text-xs mt-3 font-medium">
                        Your Rating *
                    </label>
                    <div className="mt-2">
                        <Rating
                            name="anime-rating"
                            value={selectedRating}
                            onChange={handleRatingChange}
                            max={10}
                            size="large"
                            disabled={isSubmitting}
                            sx={{
                                fontSize: isMobile ? "1.4rem" : "1.7rem",
                                '& .MuiRating-icon': {
                                    color: 'white',
                                },
                                '& .MuiRating-iconFilled': {
                                    color: '#ef4444',
                                },
                                '& .MuiRating-iconHover': {
                                    color: '#dc2626',
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col py-5">
                    <label htmlFor="reviewContent" className="md:text-sm sm:text-xs font-medium mb-2">
                        Your Review
                    </label>
                    <textarea
                        id="reviewContent"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        placeholder="Share your thoughts about this anime..."
                        rows={5}
                        maxLength={2000}
                        className="bg-background w-full px-3 py-2 border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-vertical min-h-[120px]"
                        disabled={isSubmitting}/>
                    <span className="text-xs text-gray-500 mt-2">
                        {reviewContent.length}/2000 characters
                    </span>
                </div>

                <div className="flex">
                    <button
                        type="submit"
                        disabled={isSubmitting || !selectedRating || selectedRating === 0}
                        className={`
                            px-6 py-2 w-full rounded-lg font-medium transition-all duration-200
                            ${isSubmitting || !selectedRating || selectedRating === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-primary text-white hover:opacity-90 active:scale-95'
                        }`}>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}