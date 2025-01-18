export default function SkeletonMemberCard() {
  return (
    <div className="rounded-md bg-white pb-8 shadow-xl">
      <div className="skeleton h-8 w-full" />

      <div className="-mt-12 flex w-full justify-center">
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
