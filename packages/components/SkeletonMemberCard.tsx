export default function SkeletonMemberCard() {
  return (
    <div className="bg-white shadow-xl rounded-md pb-8">
      <div className="skeleton h-8 w-full" />

      <div className="flex justify-center -mt-12 w-full">
        <div className="skeleton h-4 w-4 rounded-full" />
      </div>

      <div className="grid gap-4 p-4">
        <div className="skeleton h-4" />
        <div className="skeleton h-4" />
        <div className="skeleton h-4" />
      </div>
    </div>
  );
}
