import React, { useEffect, useRef, useState } from "react";
import "./style.css"; // make sure this path matches where your CSS file is
import { exclusiveByCategorySpeakers } from "./constant";

const flattenData = () => {
    const result = [];
    exclusiveByCategorySpeakers.forEach((categoryBlock) => {
        result.push({ type: "category", name: categoryBlock.Category });
        categoryBlock.Speakers.forEach((speaker) =>
            result.push({
                type: "speaker",
                name: speaker.Name,
                link: speaker.Link || "#",
            })
        );
    });
    return result;
};

const COLUMN_HEIGHT = 400; // px
const COLUMN_WIDTH = 200; // px

const SpeakerColumns = () => {
    const [columns, setColumns] = useState([]);
    const hiddenContainerRef = useRef(null);

    const ref = useRef();

    useEffect(() => {
        const flatData = flattenData();

        const container = ref.current;

        if (!container) {
            return;
        }

        let newIndex = 0;
        let columnIndex = 0;
        let array = [[]];

        const column = document.createElement("div");
        column.className = "column";
        container.appendChild(column);

        for (let index = 0; index < flatData.length; index++) {
            const element = flatData[index];
            console.log(element);

            const value = document.createElement("div");
            value.className = element.type === "category" ? "category" : "value";

            value.textContent = `${element.name}`;

            column.appendChild(value);

            console.log(value.clientHeight);

            array[columnIndex].push(element);

            if (column.clientHeight > 400) {
                columnIndex += 1;

                array[columnIndex] = [];

                column.removeChild(value);

                column.textContent = "";

                // createData(flatData, index);
            }
        }

        console.log("array", array);

        setColumns(array);

        // while (newIndex<flatData.length) {
        //   const shoudContinue = createData(flatData, newIndex);

        //   // if (!shoudContinue) {
        //   //   break;
        //   // }
        // }
    }, []);

    console.log("columns", columns);

    return (
        <>
            <div ref={ref} className="container">
                {columns?.map((col) => {
                    return (
                        <div className="column">
                            {col?.map((cValue) => {
                                return <div className={cValue.type === "category" ? "category" : "value"}>{cValue?.name}</div>;
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default SpeakerColumns;
