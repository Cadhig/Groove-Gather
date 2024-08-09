import { danceStyles } from "../data/danceStyles"
import { Link } from "react-router-dom"
export default function Grooves() {
    return (
        <div className=" size-full md:w-3/4 default-font flex flex-col gap-2">
            <p className="text-center text-xl md:text-2xl">Find your groove</p>
            <div className="size-full gap-2 grid grid-rows-2 grid-cols-3">
                {danceStyles.map((content, index) => {
                    return <Link key={index} to={'/grooveResult'} state={{ from: content.title }} className="bg-groove-red p-1 rounded gap-1 text-white flex flex-col items-center justify-center">
                        <img src={content.img} alt={content.title} className="grayscale-50 size-full object-cover" />
                        <p className="md:text-xl">{content.title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}