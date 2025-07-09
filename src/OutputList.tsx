import type { Application, Epoch, Input, Output } from "@cartesi/viem";
import { useOutputs } from "@cartesi/wagmi";
import { Box, Text } from "ink";
// biome-ignore lint/correctness/noUnusedImports: needs React
import React, { useState } from "react";

import OutputDetail from "./OutputDetail.js";
import PaginatedSelectInput from "./PaginatedSelectInput.js";

interface Props {
    application: Application;
    epoch: Epoch;
    input: Input;
    onBack: () => void;
}

export default function OutputList({
    application,
    epoch,
    input,
    onBack,
}: Props) {
    const [offset, setOffset] = useState(0);
    const { data, isLoading, error } = useOutputs({
        application: application.applicationAddress,
        epochIndex: epoch.index,
        inputIndex: input.index,
        offset,
    });
    const [focused, setFocused] = useState<Output>();

    if (isLoading) return <Text>Loading outputs...</Text>;
    if (error) return <Text color="red">Error: {error.message}</Text>;

    return (
        <Box flexDirection="column" flexGrow={1}>
            {data && (
                <>
                    <Text bold>Select Output:</Text>
                    <PaginatedSelectInput
                        data={data}
                        keyFn={(output) => output.index.toString()}
                        labelFn={(output) =>
                            `#${output.index.toString()} (${output.decodedData.type})`
                        }
                        onBack={onBack}
                        onNext={() => setOffset(offset + data.pagination.limit)}
                        onPrev={() => setOffset(offset - data.pagination.limit)}
                        onSelect={setFocused}
                        onHighlight={setFocused}
                    />
                </>
            )}
            {data?.data.length === 0 && (
                <Text>No outputs found for this input.</Text>
            )}
            {focused && <OutputDetail output={focused} />}
        </Box>
    );
}
