import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Step } from "../../types";
import Image from "next/image";

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
  "https://script.google.com/macros/s/AKfycbytFqSwwJgo-z60IyFNPz5vPkcQkiJnbRoatdnT2efNYnOwVZ0XQysDozUslg4MfSoWbw/exec";

const Form = ({ setStep }: { setStep: Dispatch<SetStateAction<Step>> }) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    dietaryRequirements: "",
    phone: "",
    email: "",
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
        dietaryRequirements: inputValue.dietaryRequirements,
        phone: inputValue.phone,
        email: inputValue.email,
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

  const disabled =
    !inputValue.firstName ||
    !inputValue.lastName ||
    error ||
    (!inputValue.phone && !inputValue.email);

  return (
    <div
      className="flex  flex-col items-center justify-center shadow-lg z-10 relative overflow-hidden font-poppins
      basis-full tracking-wide
    "
    >
      <div className="z-10 w-full h-full flex flex-col items-center p-12 overflow-auto">
        <Image
          src={"/formHeader.jpg"}
          alt={"form header"}
          width={150}
          height={150}
          className="rounded-full mb-4"
        />

        <p className="text-amber-100 text-center mb-4">
          *Please RSVP before 2nd of May 2024
        </p>
        <form
          className="flex flex-col  justify-center w-full text-primary"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-3">
            {/* <label className="text-amber-100 text-md ">First Name</label> */}
            <input
              className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
              type="text"
              placeholder="First Name*"
              value={inputValue.firstName}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  firstName: e.target.value,
                })
              }
            />
            {/* <label className="text-amber-100 text-md ">Last Name</label> */}
            <input
              className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
              type="text"
              placeholder="Last Name*"
              value={inputValue.lastName}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <input
            className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
            type="text"
            placeholder="Dietary Restrictions "
            value={inputValue.dietaryRequirements}
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                dietaryRequirements: e.target.value,
              })
            }
          />
          {/* <label className="text-amber-100 text-md ">Number of Guests</label> */}

          <input
            className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
            type="text"
            placeholder="Phone Number*"
            value={inputValue.phone}
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                phone: e.target.value,
              })
            }
          />

          <input
            className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
            type="email"
            placeholder="Email Address*"
            value={inputValue.email}
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                email: e.target.value,
              })
            }
          />
          {error && (
            <p className="text-red-400 text-sm mb-2">
              You can only bring up to 2 guests
            </p>
          )}
          <input
            className="w-full p-4 mb-4 border border-gray-500 bg-transparent rounded-sm text-amber-100"
            type="text"
            placeholder="Number of Guests"
            accept="number"
            value={inputValue.guestCount}
            onChange={(e) => {
              if (Number(e.target.value) > 2) {
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
                    {/* <label className="text-amber-100 text-md">
                      Guest {i + 1}
                    </label> */}
                    <input
                      placeholder={`Name of Guest ${i + 1}`}
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
            className="transition ease-in-out w-full p-3 my-2 bg-[#8A9A5B] text-white rounded-sm hover:bg-[#96a863] disabled:bg-[#a3a3a3] disabled:cursor-not-allowed disabled:text-gray-300"
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
