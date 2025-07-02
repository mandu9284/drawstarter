import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
    <h1 className="text-3xl font-bold">DrawStarter</h1>
    <div className="border p-4 rounded bg-white shadow">
      <p className="font-semibold">오늘의 주제:</p>
    </div>
    <div className="flex gap-4">
      <button className="bg-gray-200 px-4 py-2 rounded">다른 주제 보기</button>
      <Link href="/draw" className="bg-blue-500 text-white px-4 py-2 rounded">그리기 시작</Link>
    </div>
  </div>
  );
}
