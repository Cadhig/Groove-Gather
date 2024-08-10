import CalendarPreview from "../Components/CalendarPreview"
import Grooves from "../Components/Grooves"
import Header from "../Components/Header"
import SearchBar from "../Components/SearchBar"
import TopSongs from "../Components/TopSongs"
export default function Homepage() {
    return (
        <div className="h-svh flex flex-col gap-4 defaultFont">
            <Header />
            <div className="flex h-1/4 gap-4 px-2 md:flex-row items-center justify-center flex-col-reverse">
                <CalendarPreview />
                <SearchBar />
            </div>
            <div className="flex flex-col-reverse gap-4 px-2 md:flex-row">
                <TopSongs />
                <Grooves />
            </div>
        </div>
    )
}