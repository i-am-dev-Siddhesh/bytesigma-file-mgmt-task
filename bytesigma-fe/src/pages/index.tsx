import UploadImagesForm from "@/components/Forms/UploadImage";
import ImageShower from "@/components/Shower/ImageShower";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <UploadImagesForm />
      <ImageShower />
    </main>
  );
}
