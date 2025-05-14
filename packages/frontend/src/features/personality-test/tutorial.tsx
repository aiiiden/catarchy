export function PersonalityTestTutorial({ onTab }: { onTab?: () => void }) {
  return (
    <div
      className="relative h-full py-40 flex flex-col justify-between"
      role="button"
      onClick={onTab}
    >
      <p
        className="absolute bottom-0 left-0 right-0 text-center text-pretty pb-6"
        style={{
          animation: 'blink 1s infinite',
        }}
      >
        {'<<'} Tab to continue {'>>'}
      </p>
      <p className="text-center text-pretty">
        <span className="text-3xl floating block">⬆</span>
        Please read the situation and question
      </p>
      <hr />
      <p className="text-center text-pretty">
        And choose an option from A, B, C, D
        <span className="text-3xl floating block">⬇</span>
      </p>
    </div>
  );
}
