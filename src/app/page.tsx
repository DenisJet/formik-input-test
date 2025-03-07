import FormComponent from "@/components/FormComponent/FormComponent";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex justify-center align-center p-5">
      <FormComponent />
      <Toaster />
    </div>
  );
}
