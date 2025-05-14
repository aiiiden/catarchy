import { useState } from 'react';
import { PersonalityTestTutorial } from './tutorial';
import { AnswerType, testList } from './config';
import SpriteImage from '@/components/ui/sprite-image';
import { Button } from '@/components/ui/button';

export default function PersonalityTest({
  onDone,
}: {
  onDone?: (answers: AnswerType[]) => void;
}) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<AnswerType[]>([]);

  const test = testList[index];

  const handleAnswer = (option: AnswerType, index: number) => {
    answer[index] = option;
    console.log(answer);
    setAnswer(answer);

    if (index < testList.length - 1) {
      setIndex(index + 1);
    }

    if (index === testList.length - 1) {
      onDone?.(answer);
    }
  };

  return (
    <div className="h-full overflow-y-hidden">
      {!started && (
        <PersonalityTestTutorial
          onTab={() => {
            setStarted(true);
          }}
        />
      )}
      {started && (
        <div className="overflow-x-auto snap-mandatory snap-x">
          <div className="flex flex-col h-svh w-full shrink-0 snap-center">
            <header className="px-4 py-8 gap-4 flex flex-col">
              <SpriteImage id="cat/cat-5" className="mx-auto" />
              <p className="text-center text-sm p-4 border text-pretty h-20 flex justify-center items-center w-full">
                {test.situation}
              </p>
              <p className="text-center text-sm text-pretty">{test.question}</p>
            </header>

            <div className="p-4 flex-grow">
              <table>
                <tbody>
                  {test.answers.map((answer, optionIndex) => (
                    <tr key={`answer-${optionIndex}`}>
                      <th className="align-text-top">
                        {['A', 'B', 'C', 'D'][optionIndex]}.
                      </th>
                      <td className="pl-1.5 tracking-tight">{answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-1.5 px-4 pt-4 pb-8">
              <Button onClick={() => handleAnswer('A', index)}>A</Button>
              <Button onClick={() => handleAnswer('B', index)}>B</Button>
              <Button onClick={() => handleAnswer('C', index)}>C</Button>
              <Button onClick={() => handleAnswer('D', index)}>D</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
