import { Logo } from "@/components/logo/logo";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
      <div className="animate-pulse">
        <Logo size="lg" />
      </div>
    </div>
  );
};

export default Loader;
