import Image from "next/image";

export function PatientCover() {
  return (
        <div className="relative w-full h-[200px] md:h-[600px] overflow-hidden rounded-2xl">
          <Image
            src="/placeholder.jpg"
            layout="fill"
            objectFit="cover"
            alt="Placeholder"
          />
        </div>
  );
}
