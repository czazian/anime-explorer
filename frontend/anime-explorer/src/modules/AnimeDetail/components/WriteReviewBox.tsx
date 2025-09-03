import type {Anime} from "../../../model/Anime.ts";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {useState} from "react";

interface WriteReviewBoxProps {
    anime?: Anime
}

// Declare an Interface as From Group
interface ReviewData {
    rating: number;
    content: string;
}

export const WriteReviewBox = ({anime}: WriteReviewBoxProps) => {
    
    // Declare States for Submission
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingClick = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Return is any errors
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }

        // Update submission to Pass
        setIsSubmitting(true);

        // Fill verified data into interface for submission
        const reviewData: ReviewData = {
            rating: selectedRating,
            content: !reviewContent.trim()
                ? 'No comment provided'
                : reviewContent.trim()
        };
        
        try {
            // Submission to Backend Database
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset Inputs
            setSelectedRating(0);
            setReviewContent('');

            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            // Reset submission state
            setIsSubmitting(false);
        }
    };

    return (
        <div className="border border-gray-800 rounded-xl p-6 min-w-[360px]">
            <p className="sm:text-lg md:text-xl lg:text-xl">
                <DriveFileRenameOutlineOutlinedIcon className="mr-2 mb-1"/>
                Write Review
            </p>

            <form onSubmit={handleSubmit} className="pb-5">
                <div className="flex flex-col">
                    <label className="md:text-sm sm:text-xs mt-3 font-medium">
                        Your Rating *
                    </label>
                    <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                            <button
                                key={rating}
                                type="button"
                                onClick={() => handleRatingClick(rating)}
                                className={`
                                    w-8 h-8 rounded-lg border-2 transition-all duration-200 font-medium
                                    ${rating <= selectedRating
                                    ? 'bg-gradient-primary text-white border-transparent'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                                }
                                `}>
                                {rating}
                            </button>
                        ))}
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
                        disabled={isSubmitting || selectedRating === 0}
                        className={`
                            px-6 py-2 w-full rounded-lg font-medium transition-all duration-200
                            ${isSubmitting || selectedRating === 0
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