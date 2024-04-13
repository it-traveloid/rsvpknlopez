import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Step } from "../../types";

const Form = ({ setStep }: { setStep: Dispatch<SetStateAction<Step>> }) => {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    guestCount: "",
    guests: {},
  });

  const [guests, setGuests] = useState<{
    [key: string]: string;
  }>({});

  const [error, setError] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Call Apps Script function
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbzdOfckpWyr4aubK4M4naeuipVknOTnbvYw7zFH5qjxgvWcmfMIB-trQhdOxMcFB3umvQ/exec";
    const scriptParams: any = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        guestCount: inputValue.guestCount,
        guests,
      }),
    };

    const scriptResponse = await fetch(scriptUrl, scriptParams);

    // Check if Apps Script function call was successful
    if (scriptResponse.status !== 200) {
      console.error("Error calling Apps Script function:");
      return;
    }

    // Continue with your existing code...
    setStep(Step.Success);
  };

  const disabled = !inputValue.firstName || !inputValue.lastName || error;

  return (
    <div
      className="flex md:basis-1/2 flex-col items-center justify-center rounded-lg shadow-lg z-10 relative overflow-hidden font-playfair
      basis-full
    "
    >
      <div className="z-10 w-full h-full flex flex-col items-center p-12 overflow-auto">
        <h1 className="text-[5rem] font-bold mb-2 text-amber-100">RSVP</h1>
        <p className="text-amber-100 text-center mb-4">
          *Please register before end of May 2024
        </p>
        <form
          className="flex flex-col  justify-center w-full text-primary"
          onSubmit={handleSubmit}
        >
          <label className="text-amber-100 text-md ">First Name</label>
          <input
            className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
            type="text"
            value={inputValue.firstName}
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                firstName: e.target.value,
              })
            }
          />
          <label className="text-amber-100 text-md ">Last Name</label>
          <input
            className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
            type="text"
            value={inputValue.lastName}
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                lastName: e.target.value,
              })
            }
          />
          <label className="text-amber-100 text-md ">Number of Guests</label>
          {error && (
            <p className="text-red-500 text-sm">
              You can only have up to 6 guests
            </p>
          )}
          <input
            className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
            type="text"
            accept="number"
            value={inputValue.guestCount}
            onChange={(e) => {
              if (Number(e.target.value) > 6) {
                setError(true);
              } else {
                if (error) setError(false);
              }

              // only allow numbers
              if (!isNaN(Number(e.target.value))) {
                setInputValue({
                  ...inputValue,
                  guestCount: e.target.value,
                });
              }
            }}
          />

          {inputValue.guests && Number(inputValue.guests) > 0 && !error
            ? Array.from({ length: Number(inputValue.guests) }).map((_, i) => (
                <div key={i} className="flex flex-col">
                  <label className="text-amber-100 text-md">
                    Guest {i + 1}
                  </label>
                  <input
                    placeholder="Enter full name"
                    className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
                    type="text"
                    value={guests?.[i] || ""}
                    onChange={(e) =>
                      setGuests({
                        ...guests,
                        [i]: e.target.value,
                      })
                    }
                  />
                </div>
              ))
            : null}

          <button
            className="w-full p-3 my-2 bg-slate-900 text-white rounded-sm hover:bg-slate-700 disabled:bg-slate-500 disabled:cursor-not-allowed disabled:text-gray-50"
            type="submit"
            disabled={disabled}
          >
            {disabled ? "Please fill in form" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
