import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative bg-[#060b18]">
      {/* Background gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full flex justify-center px-4">
        <SignupForm />
      </div>
    </div>
  );
}
