import { NavLink } from "react-router";

const AddsList = ({formEntries}: {formEntries: any}) => {
    return      <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Form Submissions</h1>
    {formEntries.length === 0 ? (
      <p>No form submissions yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formEntries.map((entry: any) => (
          <NavLink
            to={`${entry._id}`}
            key={entry._id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Area:</div>
                <div>{entry.area?.mainText}</div>

              <div className="font-semibold">Title:</div>
              <div>{entry.title}</div>

              <div className="font-semibold">Description:</div>
              <div>{entry.description}</div>

              <div className="font-semibold">Price:</div>
              <div>{entry.price}</div>

                <div className="font-semibold">Created At:</div>
              <div>{new Date(entry.createdAt).toLocaleString()}</div>
            </div>
          </NavLink>
        ))}
      </div>
    )}
  </div>
}

export default AddsList 