export function AuthorByline({ reviewedDate }: { reviewedDate?: string }) {
  return (
    <aside className="not-prose flex flex-col md:flex-row md:items-center gap-4 my-8 p-5 bg-sg-cream rounded-xl border-l-4 border-sg-yellow">
      <div className="w-14 h-14 rounded-full bg-sg-charcoal text-sg-yellow flex items-center justify-center font-black text-xl flex-shrink-0">
        SG
      </div>
      <div className="flex-1">
        <p className="font-bold text-sg-charcoal">SG기전 엔지니어링팀</p>
        <p className="text-sm text-sg-gray mt-0.5">
          국가 자격증 보유 (건축기사 · 전기기능사) · 자체 공장 직접 설계·제작
        </p>
        {reviewedDate && (
          <p className="text-xs text-sg-gray mt-1">
            최종 검토:{" "}
            <time dateTime={reviewedDate}>
              {new Date(reviewedDate).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        )}
      </div>
    </aside>
  );
}
