import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const Form = ({ setGuest }: { setGuest: Dispatch<SetStateAction<string>> }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // take the value from the input and set it to the guest state

    setGuest(inputValue);
  };

  return (
    <div className="flex flex-col items-center justify-center w-96 h-96  rounded-lg shadow-lg z-10 relative ">
      <div className="absolute h-full w-full bg-black rounded-sm opacity-20"></div>
      <div className="z-10 w-full h-full flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4 text-white">RSVP</h1>
        <form
          className="flex flex-col items-center justify-center w-full"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-4 my-2 border border-gray-500 bg-transparent rounded-sm text-white"
            type="text"
            placeholder="Name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button
            className="w-full p-3 my-2 bg-white text-black rounded-sm"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
