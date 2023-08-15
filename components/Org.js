/**
 * The Org function is a React component that displays a list of organizers' names.
 * @returns The `Org` component is being returned, which renders a `div` element with a background
 * image and a list of `li` elements containing the names of the organizers passed as props.
 */
import React from "react";

const Org = ({ organisateurs }) => {
  return (
    <div className="bg-hero bg-cover h-screen flex justify-center items-center text-black">
      <ul>
        {organisateurs &&
          organisateurs.map((org) => {
            return <li key={org.id}>{org.attributes.Host}</li>;
          })}
      </ul>
    </div>
  );
};

export default Org;
