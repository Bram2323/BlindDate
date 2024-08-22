export const queryName = "page";
const neighbourAmount = 2;

interface PageableProps {
    currentPage: number;
    setPage: (page: number) => void;
    totalPages: number;
}

function Pageable({ currentPage, setPage, totalPages }: PageableProps) {
    if (totalPages <= 1) return <></>;

    function handleChangePage(page: number) {
        setPage(page);
    }

    const pagesToDisplay = [1];
    let pivotPage = currentPage;
    if (currentPage == 1) pivotPage++;
    else if (currentPage == totalPages) pivotPage--;
    for (let dPage = -neighbourAmount; dPage <= neighbourAmount; dPage++) {
        const page = pivotPage + dPage;
        if (page > 1 && page < totalPages) pagesToDisplay.push(page);
    }
    if (totalPages > 1) pagesToDisplay.push(totalPages);

    return (
        <>
            <div className="flex gap-1 select-none">
                {pagesToDisplay.map((page, index) => {
                    const dots =
                        index != 0 && pagesToDisplay[index - 1] < page - 1;
                    return (
                        <div key={index} className="flex gap-1">
                            {dots && <p>...</p>}
                            <button
                                className={
                                    " px-[6px] border border-black border-solid rounded-[5px] " +
                                    (page === currentPage
                                        ? " bg-[#FF6D00]"
                                        : "")
                                }
                                onClick={() => handleChangePage(page)}
                            >
                                {page}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Pageable;
