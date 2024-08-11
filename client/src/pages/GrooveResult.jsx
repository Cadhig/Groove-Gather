// reference https://ui.dev/react-router-pass-props-to-link
import { useLocation } from "react-router-dom";

export default function GrooveResult() {
    const location = useLocation()
    // const { from } = location.state

    // api call, GET use 'from' as the name for the groove style we will display on page
    // any questions ask Cadence

    return (
        <div className="defaultFont">
            result
        </div>
    )
}