import SignInForm from "@/components/SignInForm";

const page = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="w-full lg:w-80">
        <SignInForm />
      </div>
    </main>
  );
};

export default page;
