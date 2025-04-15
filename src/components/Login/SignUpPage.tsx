import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-neutral-200 gap-2 py-[4%]">
      <div className="flex flex-col items-center">
        <Avatar size="md" bgColor={"black"} />
        <p className="text-2xl">
          <span>Mern</span>
          <span className="font-bold">-Foods</span>
        </p>
      </div>
      <form
        className="h-full w-[80%] flex flex-col justify-between bg-white rounded-xl p-[5%] gap-3 shadow"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="font-bold">Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Smith"
              className="h-[2.9rem] w-full rounded focus:outline-none"
              style={{
                padding: 2 + "%" + 5 + "%",
                border: `${1}px solid #e5e5e5`,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="john.smith@gmail.com"
              className="h-[2.9rem] w-full rounded focus:outline-none"
              style={{
                padding: 2 + "%" + 5 + "%",
                border: `${1}px solid #e5e5e5`,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold">Address</label>
            <input
              name="address"
              type="text"
              placeholder="6 Avenue, London, NW9 4FB"
              className="h-[2.9rem] w-full rounded focus:outline-none"
              style={{
                padding: 2 + "%" + 5 + "%",
                border: `${1}px solid #e5e5e5`,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold">Password</label>
            <input
              name="password"
              type="password"
              minLength={6}
              placeholder="abc123"
              className="h-[2.9rem] w-full rounded focus:outline-none"
              style={{
                padding: 2 + "%" + 5 + "%",
                border: `${1}px solid #e5e5e5`,
              }}
            />
          </div>
        </div>
        <div className="h-[2.5rem] w-full bg-black text-white flex justify-center items-center rounded-lg place-self-center">
          <button type="submit" className="font-bold">
            Register
          </button>
        </div>
      </form>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link to="/">
          <p className="font-bold hover:underline">Sign In</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
