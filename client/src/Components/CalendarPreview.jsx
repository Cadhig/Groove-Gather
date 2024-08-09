import { Link } from "react-router-dom"

export default function CalendarPreview() {

    return (
        <Link to={'/calendar'} className="md:w-1/4 w-full h-3/4 md:h-full border border-groove-red rounded flex-shrink-0 flex items-center justify-center">
            calendar preview image
        </Link>
    )
}