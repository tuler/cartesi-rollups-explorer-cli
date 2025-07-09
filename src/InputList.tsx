import type { Application, Epoch, Input } from "@cartesi/viem";
import { useInputs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
// biome-ignore lint/correctness/noUnusedImports: needs React
import React, { useState } from "react";

import InputDetail from "./InputDetail.js";
import OutputList from "./OutputList.js";
import PaginatedSelectInput from "./PaginatedSelectInput.js";

interface Props {
    application: Application;
    epoch: Epoch;
    onBack: () => void;
}

export default function InputList({ application, epoch, onBack }: Props) {
    const [offset, setOffset] = useState(0);
    const { data, isLoading, error } = useInputs({
        application: application.applicationAddress,
        epochIndex: epoch.index,
        offset,
    });
    const [selected, setSelected] = useState<Input>();
    const [focused, setFocused] = useState<Input>();

    if (isLoading) return <Text>Loading inputs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;
    if (!data?.data.length) return <Text>No inputs found for this epoch.</Text>;

    return (
        <Box flexDirection="column" flexGrow={1}>
            {!selected && (
                <>
                    <Text bold>Select Input:</Text>
                    <PaginatedSelectInput
                        data={data}
                        keyFn={(input) => input.index.toString()}
                        labelFn={(input) =>
                            `#${input.index.toString()} (${input.status})`
                        }
                        onBack={onBack}
                        onNext={() => setOffset(offset + data.pagination.limit)}
                        onPrev={() => setOffset(offset - data.pagination.limit)}
                        onSelect={setSelected}
                        onHighlight={setFocused}
                    />
                </>
            )}
            {focused && <InputDetail input={focused} />}
            <Box marginLeft={4}>
                {selected && (
                    <OutputList
                        application={application}
                        epoch={epoch}
                        input={selected}
                        onBack={() => setSelected(undefined)}
                    />
                )}
            </Box>
        </Box>
    );
}
