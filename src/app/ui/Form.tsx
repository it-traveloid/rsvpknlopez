import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Step } from "../../types";

const svg = (
  <svg
    aria-hidden="true"
    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-2"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

const scriptUrl =
  "https://script.google.com/macros/s/AKfycby8PgjKSQ4OpZj_XFKTaLAn2beu4GsjiNt8V7Xq9URCfYuwN5NWyX70D4t4n2qJqi03/exec";

const Form = ({ setStep }: { setStep: Dispatch<SetStateAction<Step>> }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    // Call Apps Script function

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
    setLoading(false);
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
        <h1 className="text-[4rem] font-bold mb-2 text-amber-100">RSVP</h1>
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

          {inputValue.guestCount && Number(inputValue.guestCount) > 0 && !error
            ? Array.from({ length: Number(inputValue.guestCount) }).map(
                (_, i) => (
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
                )
              )
            : null}

          <button
            className="w-full p-3 my-2 bg-slate-900 text-white rounded-sm hover:bg-slate-700 disabled:bg-slate-500 disabled:cursor-not-allowed disabled:text-gray-50"
            type="submit"
            disabled={disabled || loading}
          >
            {loading ? svg : null}
            {disabled ? "Please fill in form" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
