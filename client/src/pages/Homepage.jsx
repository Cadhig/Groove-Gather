import CalendarPreview from "../Components/CalendarPreview"
import Header from "../Components/Header"
import SearchBar from "../Components/SearchBar"
export default function Homepage() {
    const danceStyles = ["Shuffle", "Hoop", "Aerial", "Wand", "Breaking", "Tutting"]
    return (
        <div className="h-svh">
            <Header />
            <div className="flex h-1/4 p-2 md:flex-row items-center justify-center flex-col-reverse">
                <CalendarPreview />
                <SearchBar />
            </div>
        </div>
    )
}