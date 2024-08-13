// reference https://ui.dev/react-router-pass-props-to-link
import Header from "../Components/Header";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TEACHER_BY_GROOVE } from "../utils/queries";

export default function GrooveResult() {
  const location = useLocation();
  const { from } = location.state;
  console.log(from);
  const { data, loading, error } = useQuery(GET_TEACHER_BY_GROOVE, {
    variables: { grooves: [from] },
  });
  console.log(data);
  const teachers = data?.teacherByGroove;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading teachers.</p>;

  return (
    <div className="defaultFont">
      <Header />
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4">
        {from} Teachers
      </h1>
      <div className="size-full gap-2 grid grid-rows-2 grid-cols-3">
        {teachers.map((teacher) => (
          <Link
            key={teacher.id}
            to={`/teacherProfile/${teacher.id}`}
            className="bg-gray-200 p-4 rounded-md flex flex-col items-center justify-center shadow-lg hover:bg-gray-300"
          >
            {/* <img
                            src={profile} // Default profile image
                            alt={teacher.name}
                            className="w-24 h-24 object-cover rounded-full mb-2"
                        /> */}
            <p className="font-bold text-lg">{teacher.name}</p>
            <p className="text-sm text-gray-600">{teacher.nextFestival}</p>
            <p className="text-sm text-gray-600">
              {teacher.experience} years experience
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
