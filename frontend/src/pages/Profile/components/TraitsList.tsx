export const TraitsList = ({ traits }: any) => {
    return (
        <div className="w-full rounded-lg p-4">
            <h1 className="font-extrabold tracking-wider text-center">Q&A</h1>
            <ul className="w-full flex flex-col items-center justify-center">
                {traits.map((trait: any) => (
                    <li
                        className="w-full flex flex-row items-center justify-between p-4 rounded-lg shadow-lg bg-white my-4"
                        key={trait.id}
                    >
                        <p className="text-left text-sm hover:font-bold">
                            {trait.trait.question}
                        </p>
                        <p className="text-right capitalize font-bold">
                            {trait.answer.toLowerCase().replace("_", " ")}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
